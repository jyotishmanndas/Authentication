import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDb } from "./db/db";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();


        app.listen(PORT, () => {
            console.log(`Server is running on the post ${PORT}`);
        });

    } catch (error) {
        console.log("Server failed to start", error);
        process.exit(1);
    }
};

startServer()

