import { useNavigate } from "react-router-dom";

const EditButton = ({ userId, blogId }: { userId: string; blogId: string }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/profile/${userId}/edit/${blogId}`);
  };

  return (
    <button 
      onClick={handleEdit} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Edit Blog
    </button>
  );
};

export default EditButton;
