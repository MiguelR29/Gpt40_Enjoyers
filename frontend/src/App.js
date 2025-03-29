import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Dispositivos from "./pages/Dispositivos";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/logs" element={<ProtectedRoute element={<Logs />} />} />
        <Route path="/init" element={<ProtectedRoute element={<Chatbot />} />} />
        <Route path="/dispositivos" element={<ProtectedRoute element={<Dispositivos />} />} />
      </Routes>
    </Router>
  );
}

export default App;
