import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"; 
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home"
import UpdateProfilePage from "./pages/UpdateProfilePage";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/update" element={<UpdateProfilePage />} />
        <Route path="*" element={<Navigate to="/auth?type=login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
