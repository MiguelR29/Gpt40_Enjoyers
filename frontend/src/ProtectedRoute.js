import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./loader";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <Loader />;

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
