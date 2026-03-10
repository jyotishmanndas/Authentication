import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/authentication`);
        console.log("mongoDB connected successfully");
    } catch (error) {
        console.log("Error while connect to mongoDb", error);
        process.exit(1)
    }
};