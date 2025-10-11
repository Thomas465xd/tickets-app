import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized";

interface UserPayload {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

//? Get current logged user
export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt, 
            process.env.JWT_SECRET! // Already validated existence of JWT_SECRET
        ) as UserPayload; 

        // Set user to the req object
        req.user = payload

    } catch (error) {
        throw new NotAuthorizedError("Invalid or Expired Token");
    }

    next();
}

//? Require auth for accessing a resource
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
        throw new NotAuthorizedError("Not Authorized")
    }

    next();
}