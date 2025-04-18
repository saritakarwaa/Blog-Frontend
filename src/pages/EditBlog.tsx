import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogEditor from "../components/BlogEditor";


const EditBlog = () => {
  const { userId, blogId } = useParams<{ userId: string; blogId: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [blogData, setBlogData] = useState<any>(null);

  const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://blog-app-3xeq.onrender.com";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!token || !userId) {
            console.warn("No token or user ID found.");
            return;
        }
        const response = await axios.get(`${baseUrl}/blogs/${userId}/${blogId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setBlogData(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [userId, blogId]);

  const handleUpdate = async (updatedData: any) => {
    try {
      const res=await axios.put(`${baseUrl}/blogs/${userId}/${blogId}`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/profile/${userId}`,{ state: { updatedBlog: res.data } });
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  if (!blogData) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <BlogEditor initialData={blogData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditBlog;
