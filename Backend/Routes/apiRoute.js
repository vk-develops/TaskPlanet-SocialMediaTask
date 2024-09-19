import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/social-task", upload.array("imageFiles", 10));
router.get("/get-users");

export default router;
