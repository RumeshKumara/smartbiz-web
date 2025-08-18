import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated and redirect appropriately
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (isAuthenticated && userRole) {
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "business") {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  return <LoginForm />;
};

export default Index;
