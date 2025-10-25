import { handleInputErrors, NotFoundError } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { param } from "express-validator";
import Ticket from "../models/Ticket";

const router = Router();

router.get("/:id", [
    param("id")
        .notEmpty().withMessage("Ticket ID must be present in the URL")
        .isMongoId().withMessage("Invalid Ticket ID"),
    handleInputErrors,
], async (req: Request, res: Response) => {
    const { id } = req.params; 

    const ticket = await Ticket.findById(id)
    if(!ticket) {
        throw new NotFoundError("Ticket not Found")
    }

    res.status(200).json(ticket)
});

export default router