import React, { useEffect, useState } from "react";
// import axios from "axios";

function Logs() {
    const [logs, setLogs] = useState([]);

    // useEffect(() => {
    // axios.get("http://localhost:8000/logs")
    //   .then(response => setLogs(response.data))
    //   .catch(error => console.error("Error al obtener los datos", error));
    // }, []);

    useEffect(() => {
        const logSimulados = [
            { ip: "192.168.0.1", timestamp: "2025-03-28 12:00", tipo: "Ataque DDoS", descripcion: "Tráfico anómalo detectado" },
            { ip: "192.168.0.2", timestamp: "2025-03-28 12:05", tipo: "Phishing", descripcion: "Intento de suplantación de identidad" },
            { ip: "192.168.0.3", timestamp: "2025-03-28 12:10", tipo: "Malware", descripcion: "Archivo sospechoso detectado" },
        ];

        setTimeout(() => {
            setLogs(logSimulados);
        }, 1000);
    }, []);

    return (
        <div>
            <h1>Registro de Logs</h1>
            <table>
                <thead>
                    <tr>
                        <th>IP</th>
                        <th>Timestamp</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.ip}</td>
                            <td>{log.timestamp}</td>
                            <td>{log.tipo}</td>
                            <td>{log.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Logs;