import { Router } from "express"
import { Request, Response } from "express";
import { handleInputErrors } from "../middleware/validation";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection";

const router = Router();

router.post("/register", [
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
], (req: Request, res: Response) => {
    throw new DatabaseConnectionError()
    res.status(200).json({ message: "User Created"})
    return
})

export default router