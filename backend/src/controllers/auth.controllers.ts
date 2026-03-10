import { json, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerifcationMail } from "../service/mail.service";

export const signupController = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ msg: "All field are required" })
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: "Email already registered" })
        };

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            name,
            password: hashedpassword,
            isVerified: false
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "20m" });

        const verificationLink = `${process.env.CLIENT_ORIGIN}/auth-verify/${token}`;

        await sendVerifcationMail({ email, link: verificationLink });

        return res.status(200).json({ success: true, msg: "Verification mail sent successfully" })
    } catch (error) {
        console.log("Error while signup user", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        };

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ msg: "User does not exists with this email" })
        };

        if (!existingUser.isVerified) {
            return res.status(400).json({
                msg: "Please verify your email before logging in"
            });
        }

        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) {
            return res.status(400).json({ msg: "Invalid credentials" })
        };

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: "20m" });

        return res.status(200).json({ success: true, msg: "login successfully", token })
    } catch (error) {
        console.log("Error while login", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const verifyEmailController = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({ msg: "Token not found" })
        };

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        if (!decodedToken || !decodedToken.id) {
            return res.status(400).json({ msg: "Verification link expired or invalid" })
        };

        const user = await User.findOneAndUpdate(
            { _id: decodedToken.id, isVerified: false },
            {
                $set: {
                    isVerified: true
                }
            }
        );
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        };

        return res.status(200).json({ success: true, msg: "Email verified successfully" })
    } catch (error) {
        console.log("Error while verify email", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}