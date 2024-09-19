import React, { useState } from "react";
import axios from "axios";
import { useErrorToast, useSuccessToast } from "../Hooks/useToast";

const HomePage = () => {
    const [name, setName] = useState("");
    const [handle, setHandle] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("handle", handle);
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append("imageFiles", imageFiles[i]);
        }

        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_APP_BACKEND_URI
                }/api/v1/app/user-details`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            useSuccessToast(response.data.message);

            // Resetting the form states
            setName("");
            setHandle("");
            setImageFiles([]);
        } catch (err) {
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                useErrorToast(err.response.data.message);
            } else {
                console.error(err.message);
                useErrorToast("Server Error!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    console.log(imageFiles);

    return (
        <section className="section home-section">
            <h1 className="heading">User Form</h1>
            <form onSubmit={submitHandler}>
                <div className="formDiv">
                    <label
                        htmlFor="name"
                        className="label"
                    >
                        Name:{" "}
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="formDiv">
                    <label
                        htmlFor="handle"
                        className="label"
                    >
                        Social Handle:{" "}
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter your social media handle"
                        value={handle}
                        required
                        onChange={(e) => setHandle(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="formDiv">
                    <label
                        className="label"
                        htmlFor="imageFiles"
                    >
                        Product Image: (you can add upto 10 images)
                    </label>
                    <input
                        style={{ marginTop: 8 }}
                        type="file"
                        name="imageFiles"
                        id="imageFiles"
                        multiple
                        onChange={(e) =>
                            setImageFiles([...imageFiles, ...e.target.files])
                        }
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="cta">
                    <button type="submit">
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default HomePage;
