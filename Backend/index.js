import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import connectDb from "./Config/db.js";
import apiRoute from "./Routes/apiRoute.js";

dotenv.config();
connectDb();
const PORT = 8080;
const app = express();

const link = process.env.APP_FRONTEND_LINK;
console.log(link);

app.use(express.json());
app.use(
    cors({
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin: process.env.APP_FRONTEND_LINK.trim().replace(/\/$/, ""),
    })
);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET_KEY,
});

app.get("/api/v1/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

app.use("/api/v1/app/", apiRoute);

app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});
