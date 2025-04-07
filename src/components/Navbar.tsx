import {Link,useLocation} from "react-router-dom"
import { ImBlog } from "react-icons/im";
import { NavLink } from "react-router-dom";
const Navbar=()=>{
    const location=useLocation()
    const searchParams=new URLSearchParams(location.search)
    const type = searchParams.get("type");
    const hideAuthButtons=location.pathname==='/auth' && (type === "login" || type === "signup");
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white">
            <h1 className="ml-10 text-lg font-bold"><ImBlog size={30} color="#3B82F6" /> </h1>
            <ul className="flex gap-10 justify-center flex-1">
                <li><NavLink to="/" className={({ isActive }) => isActive ? "underline text-blue-600" : "hover:text-gray-600"}>Home</NavLink></li>
                <li><NavLink to="/feed" className={({ isActive }) => isActive ? "underline text-blue-600":"hover:text-gray-600"}>My Feed</NavLink></li>
                <li><NavLink to="/related" className={({ isActive }) => isActive ? "underline text-blue-600" : "hover:text-gray-600"}>Related posts</NavLink></li>
                <li><NavLink to="/news" className={({ isActive }) => isActive ? "underline text-blue-600" : "hover:text-gray-600" }>News</NavLink></li>
            </ul>
            {!hideAuthButtons && ( <div>
                <Link to="/auth?type=signup" className="text-blue-500 hover:underline">Sign up</Link>
                <Link to="/auth?type=login" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">Log In</Link>
            </div> )}
        </nav>
    )
}
export default Navbar