import { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

interface BlogData {
  blogId?: string;
  blogTitle?: string;
  content?: string;
  image?: string;
  video?: string;
}
interface BlogEditorProps {
    initialData?: BlogData;
    onSubmit: (updatedData: BlogData) => Promise<void>;
}

const BlogEditor = ({ initialData,onSubmit }: BlogEditorProps) => {
  const [title, setTitle] = useState<string>(initialData?.blogTitle || '')
  const [content, setContent] = useState<string>(initialData?.content || '')
  const [image, setImage] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com"

  // If editing, pre-fill the form
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.blogTitle || '')
      setContent(initialData.content || '')
      // Optionally, set images and video if they are URLs
      setImage(null)
      setVideo(null)
    }
  }, [initialData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.")
      return false
    }
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (!token || !userId) {
      console.warn("No token or user ID found.");
      return;
    }
    const blogData = {
      userId,
      blogId: initialData?.blogId || Math.random().toString(36).substring(2, 8), // Generate new ID if editing
      blogTitle: title,
      content,
      image,
      video,
      reaction: [
        {
          likes: 0,
          funny: 0,
          insightful: 0,
        },
      ],
    }
    
    try {
      let response;
      if (initialData) {
        // Update blog
        response = await axios.put(`${baseUrl}/blogs/${userId}/${initialData.blogId}`, blogData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
      } else {
        // Create new blog
        response = await axios.post(`${baseUrl}/blogs`, blogData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
      }

      const createdBlog = response.data
      console.log("Blog created/updated successfully")
      navigate(`/profile/${userId}`, { state: { newBlog: createdBlog } })
    } catch (error) {
      console.log("Error creating/updating blog:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className='block font-medium'>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-3 py-2 border rounded'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full px-3 py-2 border rounded min-h-[150px]'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>Upload Image (optional)</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className='block'
        />
      </div>
      <div>
        <label className='block font-medium'>Upload Video (optional)</label>
        <input
          type="file"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className='block'
        />
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        {initialData ? 'Update Blog' : 'Post Blog'}
      </button>
    </form>
  )
}

export default BlogEditor
