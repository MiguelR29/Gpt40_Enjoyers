import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css";
import "../styles/headerMenu.css";

function Dashboard() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/obtain_logs")
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error("Error: ", error));
    }, []);

    const attackTypes = logs.reduce((acc, log) => {
        const type = log.attack_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(attackTypes).map((type) => ({
        attack_type: type,
        cantidad: attackTypes[type],
    }));

    const attackDates = logs.reduce((acc, log) => {
        const date = new Date(log.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const chartData2 = Object.keys(attackDates).map((date) => ({
        date,
        attacks: attackDates[date],
    }));

    const threatLevels = logs.reduce((acc, log) => {
        const level = log.threat_level || log.threat;
        acc[level] = (acc[level] || 0) + 1;
        return acc;
    }, {});

    const chartData3 = Object.keys(threatLevels).map((level) => ({
        name: `Nivel ${level}`,
        value: threatLevels[level],
    }));

    const COLORS = ["#b8b8b8", "#b3e0b3", "#a3c8e0", "#2d2d2d9c", "#2d2d2dbd"];

    const blockedStats = logs.reduce(
        (acc, log) => {
            if (log.blocked) {
                acc.blocked += 1;
            } else {
                acc.notBlocked += 1;
            }
            return acc;
        },
        { blocked: 0, notBlocked: 0 }
    );

    const chartData4 = [
        { status: "Bloqueados", count: blockedStats.blocked },
        { status: "No Bloqueados", count: blockedStats.notBlocked },
    ];

    return (
        <div className="mainContainer">
            <header
                style={{
                    width: '100%',
                    marginBottom: '0',
                    marginTop: '0',
                    borderBottom: '0',
                    paddingBottom: '0'
                }}
            >
                <h1 className="mainTitle">Panel de Seguridad</h1>
                <div className="contenedorMenu">
                    <a href="/logs">Registros</a>
                    <a href="/init">ChatBot</a>
                    <a href="/dispositivos">Dispositivos</a>
                </div>
            </header>

            <div className="parteContainer">
                <div className="widgetContainer">
                    <div className="widget">
                        <h1 className="primerTitle">Total de ataques</h1>
                        <h4>4 ataques</h4>
                    </div>
                    <div className="widget">
                        <h1>Día con más amenazas</h1>
                        <h4>29/03/2025</h4>
                    </div>
                    <div className="widget">
                        <h1>Tipo vulnerabilidad con mayor frecuencia</h1>
                        <h4>SQL Injection</h4>
                    </div>
                </div>
                <div className="graficaContainer pieContainer">
                    <div className="tituloContainer">
                        <h1>Distribución de niveles de amenaza</h1>
                        <div className="iconContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData3}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="graficaContainer">
                <div className="tituloContainer">
                    <h1>Ataques por Tipo</h1>
                    <div className="iconContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="attack_type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cantidad" fill="#b3e0b3" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="graficaContainer">
                <div className="tituloContainer">
                    <h1>Evolución de ataques a lo largo del tiempo</h1>
                    <div className="iconContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData2}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="attacks" stroke="#b8b8b8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="graficaContainer">
                <div className="tituloContainer">
                    <h1>Ataques bloqueados vs No bloqueados</h1>
                    <div className="iconContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData4}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#a3c8e0" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Dashboard;