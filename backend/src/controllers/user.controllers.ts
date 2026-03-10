import { Request, Response } from "express";

export const getProfileController = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            return res.status(200).json({
                success: true,
                user: req.user
            })
        }
    } catch (error) {
        console.error("Error while fetching the profile:", error);

        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
}