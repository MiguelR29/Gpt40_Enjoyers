import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Dashboard() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/obtain_logs")
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error("Error: ", error));
    }, []);

    return (
        <div>
            <h1>Panel de Seguridad</h1>
            <LineChart width={800} height={400} data={logs}>
                <CartesianGrid stroke="#ccc" />
                <XAxis datakey="timestamp" />
                <YAxis datakey="ip" />
                <Tooltip />
                <Legend />
                <Line type="monotone" datakey="tipo" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default Dashboard;