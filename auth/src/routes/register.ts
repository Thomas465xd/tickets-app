import { Router } from "express"
import { Request, Response } from "express";
import { handleInputErrors } from "../middleware/validation";
import { body } from "express-validator";
import User from "../models/User";
import { RequestConflictError } from "../errors/conflict-error";

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

    // Create the user & save it to the db
    const user = User.build({ name, email, password})
    await user.save()

    res.status(200).json({ message: "User Created", user })
    return
})

export default router