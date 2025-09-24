import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get("/user", (req: Request, res: Response) => {
    // Clear session, token, or whatever logout means in your app
    res.status(200).send({ message: "Logged out successfully" });
});

export default router