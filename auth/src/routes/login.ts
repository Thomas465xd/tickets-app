import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post("/login", [
    body("email")
        .isEmail().withMessage("Email inválido"),
    body("password")
        .notEmpty().withMessage("La Contraseña es obligatoria"),
    handleInputErrors
], (req: Request, res: Response) => {
    const { email, password } = req.body; 

    res.status(200).json({ message: "Sesión Iniciada Correctamente"})
})

export default router