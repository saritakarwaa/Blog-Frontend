import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from 'react';

const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isLogin = searchParams.get("type") === "login";

    const [formData, setFormData] = useState({
        id: "",
        email: "",
        password: ""
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            alert("Email and Password are required.");
            return;
        }
        try{
            const response=await fetch(`http://localhost:5000/auth/${isLogin ? "login" : "signup"}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data=await response.json()
            if(response.ok){
                console.log(isLogin?"Login Successful" : "Signup Successful",data)
                localStorage.setItem("token",data.token)
            }
            else{
                console.error("Error:",data.error)
                alert(data.error)
            }
        }
        catch(error){
            console.error("Request failed:", error);
        }
        //console.log(isLogin ? "Logging in..." : "Signing up...", formData);
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse?.credential) {
            try{
                const decoded = jwtDecode(credentialResponse.credential);
                //console.log(isLogin ? "Google Login Success" : "Google Signup Success", decoded);
                console.log("Decoded Google User:",decoded)
                
                const response=await fetch("https://localhost:5000/auth/google",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token: credentialResponse.credential })
                })

                const data=await response.json()
                if(response.ok){
                    console.log(isLogin ? "Google Login Success" : "Google Signup Success", data);
                    localStorage.setItem("token", data.token);
                    navigate("/dashboard");
                }
                else{
                    console.error("Google Auth Failed:", data.message);
                    alert(data.message);
                }
            }
            catch(error){
                console.error("Google Auth Request Failed:", error);
            }
        } else {
            console.error("No credential found");
        }
    };

    const handleGoogleError = () => {
        console.log("Google Login Failed");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="id"
                            placeholder="Your ID"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition duration-300"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <div className="my-4">OR</div>

                {/* ✅ Google Sign-In or Sign-Up Label */}
                <p className="hover:underline text-gray-600">{isLogin ? "Sign in with Google" : "Sign up with Google"}</p>
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

                <p className="mt-4 text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => navigate(`/auth?type=${isLogin ? "signup" : "login"}`)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;


