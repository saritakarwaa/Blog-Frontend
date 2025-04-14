
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentProfilePictureUrl, setCurrentProfilePictureUrl] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5000/auth/${userId}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setId(response.data.id);
        setEmail(response.data.email);
        console.log("PROFILE PICTURE VALUE:", response.data.profilePicture); 
        setCurrentProfilePictureUrl(`http://localhost:5000/uploads/${response.data.profilePicture}`);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("ID:", id);
    console.log("Email:", email);
    console.log("Profile Picture:", profilePicture);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("email", email);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      await axios.put(`http://localhost:5000/auth/${userId}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          //"Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      navigate(`/profile/${userId}`)
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Username</label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Profile Picture</label>
        {currentProfilePictureUrl && (
          <img
            src={currentProfilePictureUrl}
            alt="Current Profile"
            className="w-20 h-20 rounded-full mb-2"
          />
        )}
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
          className="block"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  );
};
export default UpdateProfile;
