import { Router } from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import logoutRouter from "./logout";
import getUserRouter from "./get-user";

const authRouter = Router();

// mount without repeating `/api/auth`
authRouter.use(loginRouter);
authRouter.use(registerRouter);
authRouter.use(logoutRouter);
authRouter.use(getUserRouter);

export default authRouter;
