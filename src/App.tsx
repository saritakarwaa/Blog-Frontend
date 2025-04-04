import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"; 
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/auth?type=login" />} />
      </Routes>
    </Router>
  );
}

export default App;
