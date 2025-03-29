import React, { useEffect, useState } from "react";
import "../styles/logs.css";

function Logs() {
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
                <h1 className="mainTitle">Registro de Intentos de Ataque</h1>
                <div className="contenedorMenu">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/init">ChatBot</a>
                    <a href="/dispositivos">Dispositivos</a>
                </div>
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