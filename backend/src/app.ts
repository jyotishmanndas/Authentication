import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);



export default app;