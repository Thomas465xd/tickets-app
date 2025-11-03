import { currentUser, handleInputErrors, NotFoundError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { param } from "express-validator";

const router = Router();

router.delete("/:id", [
    param("id")
        .notEmpty().withMessage("Order ID must be Present in the URL")
        .isMongoId().withMessage("Invalid Order ID"),
    handleInputErrors,
    currentUser,
    requireAuth,
], async (req: Request, res: Response) => {
    res.status(200).json({})
});

export default router