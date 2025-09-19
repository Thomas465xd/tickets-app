import express from "express"; 
import type { Request, Response } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"; 
import colors from "colors";

const app = express(); 

//? Middleware to parse JSON bodies
app.use(bodyParser.json());

//* Logs
app.use(morgan("dev"));

//^ CORS Setup
app.use(cors());

//~ Route Handlers
app.get("/api/auth/users", (req: Request, res: Response) => {
    res.send("Hello World"); 
}); 

//! Make the server available on port 4000
app.listen(4000, () => {
    console.log( colors.rainbow(`REST API working on port: 4000`))
})
