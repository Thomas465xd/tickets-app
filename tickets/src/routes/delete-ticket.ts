import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.delete("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "OK"})
});

export default router