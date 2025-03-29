import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Dispositivos from "./pages/Dispositivos";

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/init" element={<Chatbot />} />
        <Route path="/dispositivos" element={<Dispositivos />} />
      </Routes>
    </Router>
  );
}

export default App;
