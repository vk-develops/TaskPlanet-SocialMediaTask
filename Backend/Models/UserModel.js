import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        required: true,
    },
    imageUrls: [
        {
            type: String,
            required: true,
        },
    ],
});

const User = mongoose.model("User", userSchema);
export default User;
