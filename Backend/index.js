import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin: process.env.APP_FRONTEND_LINK,
    })
);

app.get("/api/v1/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});
