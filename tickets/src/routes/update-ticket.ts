import { currentUser, handleInputErrors, NotAuthorizedError, NotFoundError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { body, param } from "express-validator";
import Ticket from "../models/Ticket";

const router = Router();

router.patch("/:id", [
    param("id")
        .notEmpty().withMessage("Ticket ID must be present in the URL")
        .isMongoId().withMessage("Invalid Ticket ID"),
    body("title")
        .optional()
        .notEmpty().withMessage("Title is required"),
    body("price")
        .optional()
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body("description")
        .optional()
        .notEmpty().withMessage("Description is required"),
    body("date")
        .optional() 
        .notEmpty().withMessage("Date of the event is required"),
    handleInputErrors,
    currentUser,
    requireAuth,
], async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price, description, date } = req.body;

    const ticket = await Ticket.findById(id);
    if(!ticket) {
        throw new NotFoundError("Ticket not Found");
    }

    // .equals()  works for comparing ObjectId'ss
    if (!ticket.userId.equals(req.user.id)) {
        throw new NotAuthorizedError("You do not own this Ticket");
    }

    // // .set({...})  helps to set new properties into the ticket without writing ticket.title = title, ticket.date = date, etc...
    // ticket.set({
    //     title, 
    //     price, 
    //     description,
    //     date
    // })

    // Set only provided fields
    if (title !== undefined) ticket.title = title;
    if (price !== undefined) ticket.price = price;
    if (description !== undefined) ticket.description = description;
    if (date !== undefined) ticket.date = date;


    await ticket.save();

    res.status(200).json({ message: "Ticket updated Successfully", ticket })
});

export default router