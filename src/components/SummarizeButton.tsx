import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface SummarizeButtonProps {
  userId: string;
  blogId: string;
}

const SummarizeButton = ({ userId, blogId }: SummarizeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com";

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${baseUrl}/blogs/${userId}/${blogId}/summarize`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.summary) {
        setSummary(response.data.summary);
        toast.success("Blog summarized successfully!");
      } else {
        throw new Error("No summary generated");
      }
    } catch (error: any) {
      console.error("Summarization error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to summarize blog"
      );
      toast.error("Failed to summarize blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleSummarize}
        disabled={isLoading}
        className={`px-3 py-1 text-sm rounded ${
          isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {summary && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <h4 className="font-medium text-sm">Summary:</h4>
          <p className="text-sm">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeButton;