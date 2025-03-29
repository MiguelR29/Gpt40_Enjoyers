import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Dashboard /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/init" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
