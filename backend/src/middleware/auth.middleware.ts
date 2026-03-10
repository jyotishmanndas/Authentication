import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Authorization token missing" })
        };

        const token = authHeader.split(" ")[1];
        if (!token || token === "undefined" || token === "null") {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        if (!decoded || !decoded.id) {
            return res.status(400).json({ msg: "Invalid or expired token" })
        };

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized request" })
        };

        req.user = user;
        next()
    } catch (error) {
        console.log("Error in middleware", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};