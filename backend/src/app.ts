import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json({ limit: "16kb" }));


app.use("/api/v1/auth", authRoutes);



export default app;