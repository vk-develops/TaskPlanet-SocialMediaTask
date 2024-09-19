import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const location = useLocation();

    const isUserRoute = location.pathname === "/";
    const isAdminRoute = location.pathname === "/admin";

    return (
        <>
            <header className="header">
                {/* Title */}
                <div className="title">
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/"
                    >
                        TaskPlanet
                    </Link>
                </div>

                {/* Buttons */}
                <div className="buttons">
                    <Link
                        to="/"
                        className={`button ${isUserRoute ? "active" : ""}`}
                    >
                        User
                    </Link>
                    <Link
                        to="/admin"
                        className={`button ${isAdminRoute ? "active" : ""}`}
                    >
                        Admin
                    </Link>
                </div>
            </header>

            <ToastContainer />
            <Outlet />
        </>
    );
};

export default Layout;
