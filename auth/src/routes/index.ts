import { Router } from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import logoutRouter from "./logout";

const authRouter = Router();

// mount without repeating `/api/auth`
authRouter.use(loginRouter);
authRouter.use(registerRouter);
authRouter.use(logoutRouter);

export default authRouter;
