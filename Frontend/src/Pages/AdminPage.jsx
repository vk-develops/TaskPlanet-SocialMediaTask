import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_APP_BACKEND_URI
                    }/api/v1/app/get-users`
                );
                // console.log(response.data.users);
                setSubmissions(response.data.users);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to fetch submissions.");
                setIsLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    console.log(submissions);

    return (
        <section className="section">
            <h1 className="heading">Admin Dashboard:</h1>
            <div className="dashboard-container">
                {isLoading && (
                    <>
                        <h1>Loading Contents</h1>
                    </>
                )}
                {submissions.length === 0 ? (
                    <p>No submissions available</p>
                ) : (
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Social Media Handle</th>
                                <th>Uploaded Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr key={submission._id}>
                                    <td>{submission.name}</td>
                                    <td>{submission.handle}</td>
                                    <td className="image-cell">
                                        {submission.imageUrls.map(
                                            (url, index) => (
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={index}
                                                >
                                                    <img
                                                        src={url}
                                                        alt="uploaded thumbnail"
                                                        className="thumbnail"
                                                    />
                                                </a>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
};

export default AdminPage;
