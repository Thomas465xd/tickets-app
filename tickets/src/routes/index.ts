import { Router } from "express";
import loginRouter from "./get-ticket-by-id";
import registerRouter from "./update-ticket";
import logoutRouter from "./create-ticket";
import getUserRouter from "./get-tickets";

const ticketsRouter = Router();

// mount without repeating `/api/auth`
ticketsRouter.use(loginRouter);
ticketsRouter.use(registerRouter);
ticketsRouter.use(logoutRouter);
ticketsRouter.use(getUserRouter);

export default ticketsRouter;
