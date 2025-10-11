import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import User from "../models/User";
import { NotFoundError } from "../errors/not-found";
import { NotAuthorizedError } from "../errors/not-authorized";
import { Password } from "../utils/password";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", [
    body("email")
        .notEmpty().withMessage("Email is Required")
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required"),
    handleInputErrors
], async (req: Request, res: Response) => {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });

    if(!user) {
        throw new NotFoundError("User does not Exist")
    }

    // Compare password (provided vs DB one)
    const isMatch = await Password.comparePassword(user.password, password); 

    /** Check if passwords match */
    if(!isMatch) {
        throw new NotAuthorizedError("Invalid Password")
    }

    //~ Generate JWT
    const userJwt = jwt.sign({
        id: user.id, 
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET)

    //~ Store it on session object
    req.session = {
        jwt: userJwt
    }

    return res.status(200).json({ message: "Successfully logged in 🎉", user});
})

export default router