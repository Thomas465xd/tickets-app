import express from "express"; 
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"; 
import dotenv from "dotenv";
import authRouter from "./routes";
import { errorHandler } from "./middleware/error";
import { NotFoundError } from "./errors/not-found";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const app = express(); 

//? Middleware to parse JSON bodies
app.use(bodyParser.json());

//? Logs
app.use(morgan("dev"));

//? CORS Setup
app.use(cors());

//? Routes
app.use("/api/auth", authRouter)

//? Trigger not-found error | before Error Handler & after router declarations
app.all("/{*splat}/" , async (req, res, next) => {
    throw new NotFoundError()
});

//? Error Handler | has to be after all the route handlers
app.use(errorHandler);

export default app;
