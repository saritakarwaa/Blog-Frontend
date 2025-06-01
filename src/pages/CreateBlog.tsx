
import BlogEditor from "../components/BlogEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com";

  const handleCreate = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      console.warn("No token or user ID found.");
      return;
    }

    try {
      const response= await fetch(`${baseUrl}/blogs`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        
        }
      })
       const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create blog');
    }
      navigate(`/profile/${userId}`, { state: { newBlog: data } });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Full error:", {
          config: err.config,
          response: err.response?.data,
          headers: err.response?.headers
        });
      } else {
      console.error("Unknown error:", err);
      //toast.error("Something went wrong. Try again.");
    }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Write a New Blog</h1>
      <BlogEditor onSubmit={handleCreate} />
    </div>
  );
};

export default CreateBlog;
