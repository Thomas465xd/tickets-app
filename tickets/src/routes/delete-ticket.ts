import { currentUser, handleInputErrors, NotAuthorizedError, NotFoundError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { param } from "express-validator";
import Ticket from "../models/Ticket";
import { TicketDeletedPublisher } from "../events/publishers/ticket-deleted-publisher";
import { natsWrapper } from "../config/nats";

const router = Router();

router.delete("/:id", [
    param("id")
        .notEmpty().withMessage("Ticket ID must be present in the URL")
        .isMongoId().withMessage("Invalid Ticket ID"),
    handleInputErrors,
    currentUser,
    requireAuth,
], async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
    if(!ticket) {
        throw new NotFoundError("Ticket not Found");
    }

    // ⚠️ ownership check
    if (!ticket.userId.equals(req.user.id)) {
        throw new NotAuthorizedError("You do not own this Ticket");
    }

    //^ Delete the Ticket & Emit a ticket:deleted event
    Promise.allSettled([
        ticket.deleteOne(),
        new TicketDeletedPublisher(natsWrapper.client).publish({
            id: ticket.id
        })
    ])

    return res.status(200).json({ message: "Ticket Deleted Successfully"})
});

export default router