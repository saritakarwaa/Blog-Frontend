
import BlogEditor from "../components/BlogEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com";

  const handleCreate = async (blogData: any) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const fullData = {
      ...blogData,
      userId,
      blogId: Math.random().toString(36).substring(2, 8),
      reaction: [
        {
          likes: 0,
          funny: 0,
          insightful: 0,
        },
      ],
    };

    try {
      const res = await axios.post(`${baseUrl}/blogs`, fullData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/profile/${userId}`, { state: { newBlog: res.data } });
    } catch (err) {
      console.error("Error creating blog:", err);
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
