import React, { useEffect, useState } from "react";

function Logs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/obtain_logs")
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error("Error: ", error));
    }, []);

    return (
        <div>
            <h1>Registro de Logs</h1>
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
    );
}

export default Logs;