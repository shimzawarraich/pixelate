import React, { useState } from "react";
import { TextField, Box, InputLabel, Button } from '@mui/material';
import axios from "axios"; 


const labelStyles ={mb:1, mt:2, fontSize: '20px', fontWeight: 'bold', color: "#FF8FAB", fontFamily: "'Poppins', Bold", textAlign: 'left', marginBottom: '4px'}
const AddBlog = () => {
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
        }).catch(err => console.log(err));
        const data = await res.data;
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs); 
        sendRequest().then(data=>console.log(data))
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="500px"
                sx={{  border: '3px solid #EEAAC3', 
                    borderRadius: '20px',
                    boxShadow: '10px 10px 20px #FFB6C1',
                    padding: 3, 
                    margin: 'auto', 
                    marginTop: 3, 
                    display: 'flex',
                    flexDirection: 'column', 
                    width: '600px', 
                    backgroundColor: '#FEFAF9', }}
            >
                <InputLabel sx={labelStyles}>Title</InputLabel>
                <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant="outlined" fullWidth sx={{ backgroundColor: '#FFF0F5', borderRadius: '10px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#F1DFDD',}, '&:hover fieldset': { borderColor: '#EEAAC3',},},}}/>
                <InputLabel sx={labelStyles}>Description</InputLabel>
                <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant="outlined" fullWidth multiline rows={4} sx={{backgroundColor: '#FFF0F5', borderRadius: '10px', '& .MuiOutlinedInput-root': {'& fieldset': { borderColor: '#F1DFDD',}, '&:hover fieldset': {borderColor: '#EEAAC3',},},}}  />
                <InputLabel sx={labelStyles}>ImageURL</InputLabel>
                <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant="outlined" fullWidth sx={{backgroundColor: '#FFF0F5', borderRadius: '10px', '& .MuiOutlinedInput-root': {'& fieldset': {borderColor: '#F1DFDD',}, '&:hover fieldset': {borderColor: '#EEAAC3', }, }, }}/>
                <Button type="submit" variant="contained"  
                        sx={{
                            borderRadius:'20px',
                            padding: '8px 16px', 
                            marginTop: '16px', 
                            backgroundColor: "#FF8FAB",
                            color: "white", 
                            fontFamily: "'Poppins', Bold", 
                            fontWeight: 'bold',
                            fontSize: '14px', 
                            "&:hover": { color: "#FF1493" }, 
                        }} >Post</Button>
            </Box>
        </form>
    </div>)
}

export default AddBlog; 