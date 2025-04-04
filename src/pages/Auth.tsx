// Auth.tsx (Page)
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLogin = searchParams.get("type") === "login";

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        console.log("Login successful", result);
        navigate("/dashboard");
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleSignup = async (data: { id: string; email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        console.log("Signup successful", result);
        navigate("/dashboard");
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse?.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google user", decoded);
      try {
        const response = await fetch("http://localhost:5000/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        });
        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("token", result.token);
          console.log("Google auth success", result);
          navigate("/dashboard");
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Google auth failed", err);
      }
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      handleLogin({ email: formData.email, password: formData.password });
    } else {
      handleSignup(formData);
    }
  };

  return (
    <AuthForm
      isLogin={isLogin}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onGoogleSuccess={handleGoogleSuccess}
    />
  );
};

export default Auth;