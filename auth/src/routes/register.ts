import { Router } from "express"
import { Request, Response } from "express";
import { body } from "express-validator";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { handleInputErrors, RequestConflictError } from "@thomas-ticketx/common";

const router = Router();

router.post("/register", [
    body("name") 
        .notEmpty().withMessage("Name cannot be empty")
        .isString().withMessage("Name should be a string"),
    body("email")
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 7 }).withMessage("Password must have 7 or more characters")
        .trim()
        .escape(), 
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if(value !== req.body.password) {
                throw new Error("Las contraseñas no coinciden");
            }
            return true
        }),
    handleInputErrors,
], async (req: Request, res: Response) => {
    // Destructure email from request body
    const { name, password, email } = req.body; 
    
    // Check if the user is already registered
    const userExists = await User.findOne({ email }); 
    if(userExists) {
        throw new RequestConflictError("Email already in use")
    }

    //? Create the user & save it to the db
    const user = User.build({ name, email, password})
    await user.save()

    //~ Generate JWT
    const userJwt = jwt.sign({
        id: user.id, 
        email: user.email,
        name: user.name
    }, process.env.JWT_SECRET)

    //~ Store it on session object
    req.session = {
        jwt: userJwt
    }

    return res.status(201).json({ message: "User Created", user });
})

export default router