import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";

function App(){
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path='/auth' element={<AuthForm/>} />
        <Route path="*" element={<Navigate to="/auth?type=login" />} /> Redirect to login
      </Routes>
    </Router>
  )
} 
export default App