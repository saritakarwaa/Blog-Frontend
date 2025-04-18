import axios from "axios";


const DeleteButton = ({ userId, blogId, onDelete }: { userId: string; blogId: string; onDelete: () => void }) => {
    const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://blog-app-3xeq.onrender.com";

  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await axios.delete(`${baseUrl}/blogs/${userId}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(); // trigger UI update
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete Blog
    </button>
  );
};

export default DeleteButton;
