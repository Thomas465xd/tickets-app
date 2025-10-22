import { Router } from "express";
import { Request, Response } from "express";
import Ticket from "../models/Ticket";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})

    res.status(200).json(tickets)
});

export default router