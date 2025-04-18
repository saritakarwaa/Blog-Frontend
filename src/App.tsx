import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"; 
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home"
import UpdateProfilePage from "./pages/UpdateProfilePage";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/update" element={<UpdateProfilePage />} />
        <Route path="/create/blog" element={<CreateBlog />}/>
        <Route path="*" element={<Navigate to="/auth?type=login" />} />
        <Route path="/profile/:userId/edit/:blogId" element={<EditBlog />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
