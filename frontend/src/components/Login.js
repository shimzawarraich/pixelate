import { TextField, Typography, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import { useDispatch } from "react-redux"; 
import { loginActions } from "../store"; 
import { useNavigate } from "react-router-dom"; 
import Welcome from './welcome'; 

const Login = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [inputs, setinputs] = useState({
        name:"", 
        email:"",
        password:"" 
    })
    const [isSignup, setIsSignup] = useState(false)

    /*
    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        if (hasVisitedBefore) {
            setShowWelcome(false);
        }
    }, []);

    const handleGetStarted = () => {
        localStorage.setItem('hasVisitedBefore', 'true');
        setShowWelcome(false);
    };

    if (showWelcome) {
        return <Welcome onGetStarted={handleGetStarted} />;
    }*/

    const handleChange = (e) => {
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async(type="login") => {
        const res = await axios.post(`http://localhost:3000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password

        }).catch(err=>console.log(err))

        const data = await res.data;
        console.log(data);
        return data; 
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        if (isSignup){
            sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id))
            .then(()=>dispath(loginActions.login())).then(()=>navigate("/posts"))
            .then(data=>console.log(data))
        }
        else {
            sendRequest()
            .then((data)=>localStorage.setItem("userId", data.user._id))
            .then(()=>dispath(loginActions.login())).then(()=>navigate("/posts"))
            .then(data=>console.log(data))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                    maxWidth={400} 
                    display="flex" 
                    flexDirection={'column'} 
                    alignItems='center' 
                    justifyContent={'center'} 
                    boxShadow={"5px 5px 15px rgba(0, 0, 0, 0.2)"} 
                    padding={4} 
                    margin='auto' 
                    marginTop={5} 
                    borderRadius={10}
                    sx={{
                        backgroundColor: "white",
                        transition: "all 0.3s",
                        "&:hover": {
                            transform: "scale(1.02)", 
                            boxShadow: "8px 8px 20px rgba(0, 0, 0, 0,25)",
                        }
                    }}
                >
                    <Typography variant="h3" padding={3} textAlign={"center"} sx={{fontFamily: "'Poppins', cursive", fontWeight: 600, color: "#FF8FAB"}}>
                        {isSignup ? "Sign Up" : "Login" }
                    </Typography>

                   { isSignup && (
                        <TextField 
                            name="name" 
                            onChange={handleChange} 
                            value={inputs.name} 
                            placeholder="Name" 
                            margin="normal" 
                            fullWidth
                            sx={{
                                backgroundColor: '#FFF0F5', 
                                borderRadius: 2, 
                                "& input": {textAlign: "center"}, 
                            }}
                        />
                   )}
                   
                   <TextField 
                        name="email" 
                        onChange={handleChange} 
                        value={inputs.email} 
                        type={'email'} 
                        placeholder="Email" 
                        margin="normal" 
                        fullWidth
                        sx={{
                            backgroundColor: '#FFF0F5', 
                            borderRadius: 2, 
                            "& input": {textAlign: "center"}, 
                        }}
                    />

                    <TextField 
                        name="password" 
                        onChange={handleChange} 
                        value={inputs.password} 
                        type={'password'} 
                        placeholder="Password" 
                        margin="normal" 
                        fullWidth
                        sx={{
                            backgroundColor: '#FFF0F5', 
                            borderRadius: 2, 
                            "& input": {textAlign: "center"}, 
                        }}
                    />
                    <Button 
                        type='submit' 
                        variant="contained" 
                        sx={{borderRadius:3, 
                            marginTop:3, 
                            paddingX: 4, 
                            backgroundColor: "#FF8FAB", 
                            "&:hover": { backgroundColor: "FF6F91"}, 
                            fontFamily: "'Poppins', cursive", 
                            fontWeight: 500, 
                        }} 
                    >
                        Submit
                    </Button>

                    <Button 
                        onClick={()=>setIsSignup(!isSignup)} 
                        sx={{
                            borderRadius:3, 
                            marginTop: 3, 
                            color: "#FF8FAB", 
                            fontFamily: "'Poppins', cusrive", 
                            fontWeight: 500, 
                            "&:hover": { color: "#FF6F91" }, 
                        }}
                    >
                        Change To {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </div>
    ) 
}

export default Login 