import { Router } from "express";

const ordersRouter = Router();

// mount without repeating `/api/auth`
//ordersRouter.use(getTicketRouter);


export default ordersRouter;
