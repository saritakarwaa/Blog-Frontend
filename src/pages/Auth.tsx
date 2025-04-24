// Auth.tsx (Page)
import { useState,useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLogin = searchParams.get("type") === "login";
  const baseUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-app-3xeq.onrender.com";

      useEffect(() => {
        const checkExistingLogin = async () => {
          const token = localStorage.getItem("token");
          if (!token) return;
      
          try {
            const response = await fetch(`${baseUrl}/auth/me`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const result = await response.json();
      
            if (response.ok) {
              console.log("Auto-login successful", result);
              localStorage.setItem("userId", result._id);
              localStorage.setItem("username", result.id);
              navigate(`/profile/${result._id}`);
            } else {
              console.warn("Token invalid or expired");
            }
          } catch (err) {
            console.error("Auto-login failed", err);
          }
        };
      
        checkExistingLogin();
      }, []);

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
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId",result._id)
        localStorage.setItem("username",result.id)

        console.log("Login successful", result);
        navigate(`/profile/${result._id}`);
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleSignup = async (data: { id: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
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
        navigate("/profile");
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
        const response = await fetch(`${baseUrl}/auth/google`, {
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
          navigate("/profile");
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