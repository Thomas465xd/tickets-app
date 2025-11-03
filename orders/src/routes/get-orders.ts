import { currentUser, handleInputErrors, NotFoundError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { param } from "express-validator";

const router = Router();

router.get("/", [
    currentUser,
    requireAuth,
], async (req: Request, res: Response) => {
    res.status(200).json({})
});

export default router