import { Router } from "express";
import { Request, Response } from "express";
import { currentUser } from "../middleware/auth";

const router = Router();

router.get("/user", currentUser, (req: Request, res: Response) => {
    return res.status(200).json({ currentUser: req.user || null });
});

export default router