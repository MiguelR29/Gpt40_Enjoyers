import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function Login() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    }, [isAuthenticated, isLoading, loginWithRedirect]);

    if (isLoading) return <p>Cargando...</p>;

    return isAuthenticated ? <Navigate to="/dashboard" /> : <p>Redirigiendo al login...</p>;
}


export default Login;
