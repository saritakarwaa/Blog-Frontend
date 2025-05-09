// AuthForm.tsx
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AuthFormProps {
  isLogin: boolean;
  formData: {
    id: string;
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onGoogleSuccess: (credentialResponse: CredentialResponse) => void;
}

const AuthForm = ({ isLogin, formData, onChange, onSubmit, onGoogleSuccess }: AuthFormProps) => {
  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };
  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com"
  const navigate=useNavigate()


  const handleForgotPassword=async()=>{
    try{
      await axios.post(`${baseUrl}/auth/forgot-password`,{
        email:formData.email,
      })
      toast.success("Password reset link send to your email!")
      setTimeout(() => {
        navigate(`/reset-password/:token`); 
      }, 1500); // Delay a bit so toast is visible
    }
    catch(err:any){
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {!isLogin && (
            <input
              type="text"
              name="id"
              placeholder="Your ID"
              value={formData.id}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
              </button>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4">OR</div>

        <p className="hover:underline text-gray-600">
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </p>
        <GoogleLogin onSuccess={onGoogleSuccess} onError={handleGoogleError} />

        <p className="mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href={`/auth?type=${isLogin ? "signup" : "login"}`}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

  