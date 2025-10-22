import { currentUser, handleInputErrors, NotFoundError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { body, param } from "express-validator";
import Ticket from "../models/Ticket";

const router = Router();

router.patch("/:id", [
    param("id")
        .notEmpty().withMessage("El ID del Usuario es Obligatorio")
        .isMongoId().withMessage("El ID del Usuario no es Valido"),
    body("title")
        .notEmpty().withMessage("Title is required"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body("description")
        .notEmpty().withMessage("Description is required"),
    body("date")
        .notEmpty().withMessage("Date of the event is required"),
    handleInputErrors,
    currentUser,
    requireAuth,
    handleInputErrors,
], async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if(!ticket) {
        throw new NotFoundError("Ticket not Found");
    }

    res.status(200).json(ticket)
});

export default router