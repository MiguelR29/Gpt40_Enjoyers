import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import "../styles/logs.css";

function Logs() {
    const { logout } = useAuth0();

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/obtain_logs")
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error("Error: ", error));
    }, []);

    return (
        <div className="mainContainerLogs">
            <header>
                <div className="encerrar">
                    <h1 className="mainTitle">Registro de Intentos de Ataque</h1>
                    <div className="contenedorMenu">
                        <a href="/dashboard">Dashboard</a>
                        <a href="/init">ChatBot</a>
                        <a href="/dispositivos">Dispositivos</a>
                    </div>
                </div>
                <button id="btnCerrar" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Cerrar sesión
                </button>
            </header>

            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Timestamp</th>
                            <th>Tipo de Ataque</th>
                            <th>Dispositivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.ip}</td>
                                <td>{log.timestamp}</td>
                                <td>{log.attack_type}</td>
                                <td>{log.device}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Logs;