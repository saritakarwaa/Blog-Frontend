import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
const ProfilePage = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/login')
  }
  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Profile</h1>
      <button
          onClick={handleLogout}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 transition'
        >Logout</button>
        </div>
      <Profile />
    </div>
  )
}

export default ProfilePage