import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Dashboard /> } />
        <Route path="/logs" element={<Logs />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
