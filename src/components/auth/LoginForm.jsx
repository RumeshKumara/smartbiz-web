import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { Building2, Shield, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
// import businessBg from "@/assets/business-bg.jpg";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [userType, setUserType] = useState("business");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Demo credentials - validate both credentials and user type selection
      if (email === "admin@smartbiz.com" && password === "admin123") {
        if (userType !== "admin") {
          setError("Admin credentials require Admin user type selection.");
          return;
        }
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else if (email === "owner@business.com" && password === "owner123") {
        if (userType !== "business") {
          setError(
            "Business credentials require Business user type selection."
          );
          return;
        }
        localStorage.setItem("userRole", "business");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("businessName", "Tech Solutions Inc.");
        navigate("/dashboard");
      } else {
        setError(
          "Invalid credentials. Try demo accounts or register a new account."
        );
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (userType === "business" && !businessName.trim()) {
      setError("Business name is required.");
      setIsLoading(false);
      return;
    }
    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Store new user data (in real app, this would be sent to backend)
      const userData = {
        email,
        userType,
        businessName: userType === "business" ? businessName : undefined,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("registeredUsers") || "[]"),
          userData,
        ])
      );
      setSuccess(
        "Registration successful! You can now sign in with your credentials."
      );
      // Auto switch to login mode after successful registration
      setTimeout(() => {
        setIsRegistering(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Card
          elevation={2}
          sx={{
            bgcolor: "background.paper",
            opacity: 0.95,
            borderRadius: 8,
            width: {
              xs: "100%",
              sm: "90%",
              md: "70%",
              lg: "50%",
              xl: "35%",
            },
            maxWidth: 480,
            mx: "auto",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #000000, #1e1e1e)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2
                    style={{ color: "white", width: 32, height: 32 }}
                  />
                </Box>
              </motion.div>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #000000, #040404)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SmartBiz
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-Powered Business Management Suite
              </Typography>
            </Box>

            {/* User Type Selection */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                gap: 2,
              }}
            >
              <Button
                variant={userType === "business" ? "contained" : "outlined"}
                onClick={() => setUserType("business")}
                startIcon={<Building2 style={{ width: "16", height: 16 }} />}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  flex: 1,
                  ...(userType === "business" && {
                    background: "black",
                    "&:hover": {
                      background: "#131313",
                    },
                  }),
                  borderColor: "black",
                  color: userType === "business" ? "white" : "text.primary",
                }}
              >
                Business
              </Button>
              <Button
                variant={userType === "admin" ? "contained" : "outlined"}
                onClick={() => setUserType("admin")}
                startIcon={<Shield style={{ width: 16, height: 16 }} />}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  flex: 1,
                  ...(userType === "admin" && {
                    background: "black",
                    "&:hover": {
                      background: "#131313",
                    },
                  }),
                  borderColor: "black",
                  color: userType === "admin" ? "white" : "text.primary",
                }}
              >
                Admin
              </Button>
            </Box>

            <form
              onSubmit={isRegistering ? handleRegister : handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography
                  htmlFor="email"
                  variant="subtitle2"
                  sx={{ mb: 0.5, fontWeight: 500, color: "text.primary" }}
                >
                  Email
                </Typography>
                <TextField
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Mail
                        style={{
                          marginRight: 8,
                          color: "#bdbdbd", // lighter gray
                          borderRadius: 10,
                        }}
                      />
                    ),
                  }}
                  sx={{
                    borderRadius: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "& fieldset": {
                        borderColor: "#c1c1c1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#131313",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                />
              </Box>

              {isRegistering && userType === "business" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    htmlFor="businessName"
                    variant="subtitle2"
                    sx={{ mb: 0.5, fontWeight: 500, color: "text.primary" }}
                  >
                    Business Name
                  </Typography>
                  <TextField
                    id="businessName"
                    type="text"
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Building2
                          style={{ marginRight: 8, color: "#bdbdbd" }}
                        />
                      ),
                    }}
                    sx={{
                      borderRadius: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": {
                          borderColor: "#c1c1c1",
                        },
                        "&:hover fieldset": {
                          borderColor: "#131313",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                    }}
                  />
                </motion.div>
              )}

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography
                  htmlFor="password"
                  variant="subtitle2"
                  sx={{ mb: 0.5, fontWeight: 500, color: "text.primary" }}
                >
                  Password
                </Typography>
                <TextField
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Lock style={{ marginRight: 8, color: "#bdbdbd" }} />
                    ),
                  }}
                  sx={{
                    borderRadius: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "& fieldset": {
                        borderColor: "#c1c1c1",
                      },
                      "&:hover fieldset": {
                        borderColor: "#131313",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                />
              </Box>

              {isRegistering && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Typography
                    htmlFor="confirmPassword"
                    variant="subtitle2"
                    sx={{ mb: 0.5, fontWeight: 500, color: "text.primary" }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Lock style={{ marginRight: 8, color: "#bdbdbd" }} />
                      ),
                    }}
                    sx={{
                      borderRadius: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": {
                          borderColor: "#c1c1c1",
                        },
                        "&:hover fieldset": {
                          borderColor: "#131313",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                    }}
                  />
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="error">{error}</Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="success">{success}</Alert>
                </motion.div>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  background: "black",
                  borderRadius: 3,
                  height: 48,
                  "&:hover": {
                    background: "#131313",
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>
                      {isRegistering ? "Creating account..." : "Signing in..."}
                    </span>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <span>{isRegistering ? "Create Account" : "Sign In"}</span>
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </Box>
                )}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError("");
                    setSuccess("");
                  }}
                  sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                >
                  {isRegistering
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Register"}
                </Button>
              </Box>
            </form>
          </CardContent>
          <Divider />
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Demo Credentials:
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
            >
              <strong>Business:</strong> owner@business.com / owner123
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
            >
              <strong>Admin:</strong> admin@smartbiz.com / admin123
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default LoginForm;
