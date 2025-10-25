import { Router } from "express";
import getTicketRouter from "./get-ticket-by-id";
import updateTicketRouter from "./update-ticket";
import createTicketRouter from "./create-ticket";
import getTicketsRouter from "./get-tickets";
import deleteTicketRouter from "./delete-ticket";

const ticketsRouter = Router();

// mount without repeating `/api/auth`
ticketsRouter.use(getTicketRouter);
ticketsRouter.use(updateTicketRouter);
ticketsRouter.use(createTicketRouter);
ticketsRouter.use(getTicketsRouter);
ticketsRouter.use(deleteTicketRouter);

export default ticketsRouter;
