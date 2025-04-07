import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"; 
import Profile from "./pages/Profile";
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/auth?type=login" />} />
      </Routes>
    </Router>
  );
}

export default App;
