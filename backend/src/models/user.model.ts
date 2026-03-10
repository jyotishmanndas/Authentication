import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

export const User: Model<IUser> = mongoose.model("User", userSchema)