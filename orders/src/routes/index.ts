import { Router } from "express";
import createOrderRouter from "./create-order"

const ordersRouter = Router();

// mount without repeating `/api/auth`
ordersRouter.use(createOrderRouter);


export default ordersRouter;
