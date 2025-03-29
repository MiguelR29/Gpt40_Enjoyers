import React from "react";
import "../styles/login.css";
import imgPrincipal from "../img/a-chosen-soul-aZyP_xZUpVk-unsplash.jpg";

function Login() {
    return (
        <div className="contenedorPrincipal">
            <div className="capaBlur"></div>
            <div className="contenedorImg">
                <img src={imgPrincipal} alt="logDiscret" />
            </div>
            <div className="contenedorForm">
                <h1 className="login-title">Iniciar sesión</h1>
                <form className="login-form">
                    <label htmlFor="username" className="login-label">Usuario</label>
                    <input type="text" id="username" className="login-input" />

                    <label htmlFor="password" className="login-label">Contraseña</label>
                    <input type="password" id="password" className="login-input" />

                    <button type="submit" className="login-button">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;