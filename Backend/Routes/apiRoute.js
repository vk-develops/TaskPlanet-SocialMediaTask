import express from "express";
import multer from "multer";
import {
    getUserDetails,
    sendUserDetails,
} from "../Controller/userNAdmincontroller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/user-details", upload.array("imageFiles", 10), sendUserDetails);
router.get("/get-users", getUserDetails);

export default router;
