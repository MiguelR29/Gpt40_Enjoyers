import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <p>Cargando...</p>; // Evita redirección prematura

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
