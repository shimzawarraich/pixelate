import { TextField, Typography, Box, Button, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import { useDispatch } from "react-redux"; 
import { loginActions } from "../store"; 
import { useNavigate, useLocation } from "react-router-dom"; 

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const initialSignupState = queryParams.has("signup") ? queryParams.get("signup") === "true" : false;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const [isSignup, setIsSignup] = useState(initialSignupState);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    useEffect(() => {
        setIsSignup(queryParams.has("signup") ? queryParams.get("signup") === "true" : false);
    }, [location.search]);

    useEffect(() => {
        if (queryParams.get("logout") === "true") {
            setMessage("You have been logged out successfully.");
            setMessageType("info");
            setTimeout(() => setMessage(""), 3000);
        }
    }, [location.search]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const sendRequest = async (type = "login") => {
        try {
            const res = await axios.post(`http://localhost:3000/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            });
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(isSignup ? "signup" : "login")
            .then((data) => {
                if (data) {
                    localStorage.setItem("userId", data.user._id);
                    dispatch(loginActions.login());
                    if (isSignup) {
                        setMessage("Signup successful! You can now log in.");
                        setMessageType("success");
                        setTimeout(() => navigate("/login"), 2000);
                    } else {
                        setMessage("Login successful! Redirecting...");
                        setMessageType("success");
                        setTimeout(() => navigate("/posts"), 2000);
                    }
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                    maxWidth={400} 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    boxShadow="5px 5px 15px rgba(0, 0, 0, 0.2)" 
                    padding={4} 
                    margin="auto" 
                    marginTop={5} 
                    borderRadius={10}
                    sx={{
                        backgroundColor: "white",
                        transition: "all 0.3s",
                        "&:hover": {
                            transform: "scale(1.02)", 
                            boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.25)",
                        }
                    }}
                >
                    <Typography 
                        variant="h3" 
                        padding={3} 
                        textAlign="center"
                        sx={{ fontFamily: "'Poppins', cursive", fontWeight: 600, color: "#FF8FAB" }}
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </Typography>

                    {message && (
                        <Alert severity={messageType} sx={{ width: "100%", marginBottom: 2 }}>
                            {message}
                        </Alert>
                    )}

                    {isSignup && (
                        <TextField 
                            name="name" 
                            onChange={handleChange} 
                            value={inputs.name} 
                            placeholder="Name" 
                            margin="normal" 
                            fullWidth
                            sx={textFieldStyles}
                        />
                    )}

                    <TextField 
                        name="email" 
                        onChange={handleChange} 
                        value={inputs.email} 
                        type="email" 
                        placeholder="Email" 
                        margin="normal" 
                        fullWidth
                        sx={textFieldStyles}
                    />

                    <TextField 
                        name="password" 
                        onChange={handleChange} 
                        value={inputs.password} 
                        type="password" 
                        placeholder="Password" 
                        margin="normal" 
                        fullWidth
                        sx={textFieldStyles}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={submitButtonStyles} 
                    >
                        Submit
                    </Button>

                    <Button 
                        onClick={() => setIsSignup(!isSignup)} 
                        sx={changeButtonStyles}
                    >
                        Change To {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

const textFieldStyles = {
    backgroundColor: '#FFF0F5', 
    borderRadius: 2, 
    "& input": { textAlign: "center" }, 
};

const submitButtonStyles = {
    borderRadius: 3, 
    marginTop: 3, 
    backgroundColor: "#FF8FAB", 
    "&:hover": { backgroundColor: "#FF6F91" }, 
    fontFamily: "'Poppins', cusrive", 
    fontWeight: 500, 
};

const changeButtonStyles = {
    borderRadius: 3, 
    marginTop: 3, 
    color: "#FF8FAB", 
    fontFamily: "'Poppins', cusrive", 
    fontWeight: 500, 
    "&:hover": { color: "#FF6F91" }, 
};

export default Login;
