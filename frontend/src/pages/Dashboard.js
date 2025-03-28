import React, { useEffect, useState } from "react";
// import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Dashboard() {
    const [logs, setLogs] = useState([]);

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
            <h1>Panel de Seguridad</h1>
            <LineChart width={800} height={400} data={logs}>
                <CartesianGrid stroke="#ccc" />
                <XAxis datakey="timestamp" />
                <YAxis datakey="ip"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" datakey="tipo" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default Dashboard;