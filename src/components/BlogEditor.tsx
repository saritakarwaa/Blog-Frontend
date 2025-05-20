import { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

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

const BlogEditor = ({ initialData}: BlogEditorProps) => {
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
      toast.error("Please log in again.")
      return;
    }

    const form=new FormData();
    form.append('userId',userId)
    form.append('blogId',initialData?.blogId || Math.random().toString(36).substring(2, 8))
    form.append('blogTitle',title)
    form.append('content',content)
    form.append('reaction',JSON.stringify([{ likes: 0, funny: 0, insightful: 0 }]))


    if(image) form.append('blogImage',image)
    if(video) form.append('blogVideo',video)
    
    try {
       const url = initialData
      ? `${baseUrl}/blogs/${userId}/${initialData!.blogId}` // PUT
      : `${baseUrl}/blogs`;                                // POST

      const res = await axios({
        method: initialData ? 'put' : 'post',
        url,
        data: form,
        headers: { Authorization: `Bearer ${token}` }, // no need to set Content‑Type manually
      });
      console.log(initialData ? 'Blog updated successfully.' : 'Blog posted!')
      navigate(`/profile/${userId}`, { state: { newBlog: res.data } })
    } catch (error) {
      console.log("Error creating/updating blog:", error)
       toast.error('Server error. Please try again.')
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
        <label className='block font-medium'>Upload Image(optional)</label>
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
