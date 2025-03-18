import React, { useState } from "react";
import { TextField, Typography, Box, InputLabel, Button } from '@mui/material';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";


const labelStyles ={mb:1, mt:2, fontSize: '24px', fontWeight: 'bold', color: "#FF69B4"}
const AddBlog = () => {
    const navigate = useNavigate()
    const [inputs, setinputs] = useState({
            title:"", 
            description:"",
            imageURL:"" 
    })
    const handleChange = (e) => {
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async() => {
        const res = await axios.post("http://localhost:3000/api/post/add", {
            title: inputs.title,
            description: inputs.description,
            image: inputs.imageURL, 
            user: localStorage.getItem("userId")
        })
        .catch(err => console.log(err));
        const data = await res.data;
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs); 
        sendRequest().then(data=>console.log(data))
        .then(()=>navigate('/posts'));
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <Box 
                border={3} 
                borderColor="#FFC0CB" 
                borderRadius={10} 
                boxShadow="10px 10px 20px #FFB6C1" 
                padding={3} 
                margin={"auto"} 
                marginTop={3}
                display='flex' 
                flexDirection={'column'} 
                width={"80%"}
            >
                <Typography fontWeight={'bold'} padding={3} color="#FF8FAB" variant="h2" textAlign={'center'}>Post Your Posts</Typography>
                <InputLabel sx={labelStyles}>Title</InputLabel>
                <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant="outlined"/>
                <InputLabel sx={labelStyles}>Description</InputLabel>
                <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant="outlined"/>
                <InputLabel sx={labelStyles}>ImageURL</InputLabel>
                <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant="outlined"/>
                <Button   sx={{
                            mt:2,
                            borderRadius:4, 
                            marginTop: 3, 
                            backgroundColor: "#FF69B4",
                            color: "white", 
                            fontFamily: "'Poppins', cusrive", 
                            fontWeight: 500, 
                            "&:hover": { color: "#FF1493" }, 
                        }} variant="contained" type="submit">Post</Button>
            </Box>
        </form>
    </div>)
}

export default AddBlog; 