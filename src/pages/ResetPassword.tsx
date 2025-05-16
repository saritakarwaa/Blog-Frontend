import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const {token}=useParams()
    const navigate=useNavigate()
    const [newPassword,setNewPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com"

    const handleResetPassword=async(e:React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await axios.post(`${baseUrl}/auth/forgot-password/reset-password/${token}`,{
                newPassword, })
            toast.success("Password reset successful, Please log in.")
            navigate("/auth?type=login")
        }
        catch(err:any){
            toast.error(err.response?.data?.message || "Error resetting password");
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword