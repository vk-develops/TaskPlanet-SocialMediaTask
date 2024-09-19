import asynHandler from "express-async-handler";
import { uploadImages } from "../Helpers/uploadImages.js";
import User from "../Models/UserModel.js";

// @desc    Add User details
// @route   GET /api/v1/app/user-details
// @access  Public
const sendUserDetails = asynHandler(async (req, res) => {
    try {
        const { name, handle } = req.body;

        const imageUrls = await uploadImages(req.files);

        const user = new User({ name, handle, imageUrls });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User details saved successfully",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Get User details
// @route   GET /api/v1/app/get-details
// @access  Public
const getUserDetails = asynHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            users,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { sendUserDetails, getUserDetails };
