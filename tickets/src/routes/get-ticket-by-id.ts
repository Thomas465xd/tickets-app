import { handleInputErrors, NotFoundError } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { param } from "express-validator";
import Ticket from "../models/Ticket";

const router = Router();

router.get("/:id", [
    param("id")
        .notEmpty().withMessage("El ID del Usuario es Obligatorio")
        .isMongoId().withMessage("El ID del Usuario no es Valido"),
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