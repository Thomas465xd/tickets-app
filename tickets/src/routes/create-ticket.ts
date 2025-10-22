import { currentUser, handleInputErrors, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import Ticket from "../models/Ticket";
import { Types } from "mongoose";

const router = Router();

router.post("/", [
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
], async (req: Request, res: Response) => {
    const { title, price, description, date } = req.body;
    
    const ticket = Ticket.build({
        title, 
        price, 
        description, 
        date, 
        userId: new Types.ObjectId(req.user.id)
    })

    await ticket.save();

    res.status(201).json({ 
        ticket, 
        message: "Ticket Created Successfully 🎉"
    })
});

export default router