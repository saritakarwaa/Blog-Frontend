import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

interface User{
    id:string,
    email:string,
    blogs:any[],
    profilePicture:string
}

const Profile = () => {
  const {id}=useParams()
  const [user,setUser]=useState<User | null>(null);
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com";

  useEffect(()=>{
    const token=localStorage.getItem("token")
    const userId=localStorage.getItem("userId")
    console.log("Token:",token)
    console.log("User Id:",userId)
    if (!token || !userId) {
        console.warn("No token or user ID found.");
        setLoading(false);
        return; 
    }
    const fetchProfile=async()=>{
        try{
            const response=await axios.get(`${baseUrl}/auth/${userId}/profile`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("User data:",response.data)
            setUser(response.data)   
        }
        catch(error){
            console.error("Error fetching profile",error)
        }
        finally{
            setLoading(false)
        }
    }
    if(userId && token){
        fetchProfile()
    }
  },[id])
  if(loading) return <p className="text-center mt-8">Loading...</p>
  return(
    <section className="mt-8">
        <div className="flex flex-col items-center">
            
            <img
            src={`http://localhost:5000/uploads/${user?.profilePicture}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
            />
           
            <h2 className="mt-4 text-xl font-semibold">{user?.id}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user?.blogs.length || 0} Blog Posts</p>
            
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate('/profile/update')}>Edit Profile</button>

        </div>

        {user?.blogs && user?.blogs.length>0 && (
            <div className="mt-8 w-full max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl font-semibold mb-2">Your Blog Posts</h3>
                {user?.blogs.map((blog,index)=>(
                    <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold">{blog.blogTitle}</h3>
                    <p className="text-gray-700 text-sm mt-1 line-clamp-3">{blog.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}

            </div>
        )}
    </section>
  )
}

export default Profile