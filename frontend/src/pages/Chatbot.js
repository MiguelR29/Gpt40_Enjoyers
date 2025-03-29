import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");

    const consultarChatbot = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/chat", { pregunta: question });
            setResponse(res.data.respuesta);
        } catch (error) {
            setResponse("Error al consultar el chatbot");
        }
    };

    return (
        <div>
            <h1>Chatbot de Seguridad</h1>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Haz una pregunta..." />
            <button onClick={consultarChatbot}>Consultar</button>
            <p>{response}</p>
        </div>
    );
}

export default Chatbot;