import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [responseChat, setResponseChat] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const formatResponse = (text) => {
        // Decodificar caracteres Unicode
        const decodedText = text
            .replace(/\\u([\dA-Fa-f]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
            .replace(/\\n/g, "\n");

        // Formatear tablas estilo Markdown
        const formatTable = (tableBlock) => {
            const rows = tableBlock.trim().split("\n").filter(row => row.includes("|"));

            let tableHTML = "<table border='1' style='border-collapse: collapse; width: 100%;'>";

            rows.forEach((row, index) => {
                const columns = row.split("|").map(col => col.trim()).filter(col => col);

                // Encabezados con <th> en la primera fila
                if (index === 0) {
                    tableHTML += "<thead><tr>" + columns.map(col => `<th>${col}</th>`).join("") + "</tr></thead>";
                }
                // Ignorar la fila de separadores
                else if (!columns[0].startsWith(":")) {
                    tableHTML += "<tr>" + columns.map(col => `<td>${col}</td>`).join("") + "</tr>";
                }
            });

            tableHTML += "</table>";
            return tableHTML;
        };

        // Detectar y formatear tablas Markdown
        const formattedText = decodedText.replace(
            /(\|.*\|(?:\n\|.*\|)+)/g,
            (match) => formatTable(match)
        );

        // Aplicar formato general (negritas, código y saltos de línea)
        return formattedText
            .replace(/\n/g, "<br/>") // Saltos de línea
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Negritas
            .replace(/`(.*?)`/g, "<code>$1</code>"); // Código
    };

    const consultarChatbot = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/chat", { pregunta: question });
            const formattedResponse = formatResponse(res.data.response);
            setChatHistory(prevHistory => [
                ...prevHistory,
                { pregunta: question, respuesta: formattedResponse }
            ]);

            setResponse(formattedResponse);

            setQuestion('');

            const contenedorChat = document.querySelector('.contenedorChat');
            if (contenedorChat) {
                contenedorChat.style.display = 'block';
            }

            const respuestas = document.querySelectorAll('.contenedorRespuestaFinal');
            if (respuestas.length > 0) {
                const ultimoElemento = respuestas[respuestas.length - 1];

                ultimoElemento.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'
                });

                setTimeout(() => {
                    window.scrollBy(0, 200);
                }, 500);
            }
        } catch (error) {
            setResponse("Error al consultar el chatbot");
        }
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/init")
            .then((responseChat) => responseChat.json())
            .then((data) => {
                const formattedInitResponse = formatResponse(data.message);
                setResponseChat(formattedInitResponse);
            })
            .catch((error) => console.error("Error: ", error));
    }, []);

    return (
        <div className="contenedorMainChat">
            <header>
                <h1 className="mainTitle">Chatbot de Seguridad</h1>
                <div className="contenedorMenu">
                    <a href="/logs">Registros</a>
                    <a href="/dashboard">Panel de Seguridad</a>
                    <a href="/dispositivos">Dispositivos</a>
                </div>
            </header>

            <div className="formContainer">
                <textarea
                    placeholder="Escribe tu pregunta..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button id="btnConsultar" onClick={consultarChatbot}>Consultar</button>
            </div>

            <div className="chatContainer">
                <div className="inicioContainer">
                    <h2>Inicialización del Chat</h2>
                    <div>
                        {responseChat === "" ? (
                            <p>Cargando...</p>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: responseChat }} />
                        )}
                    </div>
                </div>
                <div className="contenedorChat"
                    style={{
                        display: "none",
                    }}
                >
                    <h2>Conversación con el Chat</h2>
                    <div className="respuestasContainer">
                        {chatHistory.map((item, index) => (
                            <div key={index} className="contenedorRespuesta">
                                <div className="contendorFlexP">
                                    <div className="contenedorPregunta">{item.pregunta}</div>
                                </div>
                                <div className="contenedorRespuestaFinal">
                                    <div dangerouslySetInnerHTML={{ __html: item.respuesta }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;