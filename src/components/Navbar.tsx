import {Link} from "react-router-dom"
import { ImBlog } from "react-icons/im";
const Navbar=()=>{
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white">
            <h1 className="ml-10 text-lg font-bold"><ImBlog size={30} color="#3B82F6" /> </h1>
            <ul className="flex gap-6">
                <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
                <li><Link to="/feed" className="hover:text-gray-600">My Feed</Link></li>
                <li><Link to="/related" className="hover:text-gray-600">Related posts</Link></li>
                <li><Link to="/news" className="hover:text-gray-600">News</Link></li>
            </ul>
            <div>
                <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                <Link to="/login" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">Log In</Link>
            </div>
        </nav>
    )
}
export default Navbar