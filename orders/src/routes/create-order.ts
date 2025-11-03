import { currentUser, handleInputErrors, NotFoundError, OrderStatus, RequestConflictError, requireAuth } from "@thomas-ticketx/common";
import { Router } from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import Ticket from "../models/Ticket";
import Order from "../models/Order";
import mongoose from "mongoose";

const router = Router();

router.post("/", [
    body("ticketId")
        .notEmpty().withMessage("ticketId must be Provided")
        .isMongoId().withMessage("Invalid ticketId"),
    handleInputErrors,
    currentUser,
    requireAuth,
], async (req: Request, res: Response) => {
    // Destructure the ticketId from request body
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId)
    if(!ticket) {
        throw new NotFoundError("Ticket not Found")
    }

    // Make sure ticket is not already reserved
    // Run query to look at al Orders.
    // Find an Order where the ticket is the one we just found and that it is "not" cancelled.
    // If we find an order from that, it means the ticket is reserved.
    const isReserved = await ticket.isReserved(); 
    if(isReserved) {
        throw new RequestConflictError("Ticket is already Reserved");
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + parseInt(process.env.EXPIRATION_SECONDS))

    // Build the order and save it to the database
    const order = Order.build({
        userId: new mongoose.Types.ObjectId(req.user.id),
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticketId
    })

    // Publish an event saying that an order was created & save Order to DB
    Promise.allSettled([
        order.save() 
    ])

    res.status(201).json({
        message: "Order Registered Successfully", 
        order
    })
});

export default router