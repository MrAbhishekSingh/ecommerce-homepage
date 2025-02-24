import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
    const location = useLocation();

    // Convert pathname to uppercase and replace dashes with spaces
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentPage = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1].replace("-", " ").toUpperCase() : "HOME";

    return (
        <>
            <Header />
            <div className="w-100 border d-flex p-3 justify-content-center bg-light">
                <h5>{currentPage === "HOME" ? null : "HOME"} {pathSegments.length > 0 && `/ `} <b>{currentPage}</b></h5>
            </div>
            <main className="container mt-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
