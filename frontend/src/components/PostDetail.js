import { TextField, Typography, Box, InputLabel, Button } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = (darkMode) => ({mb:1, mt:2, fontSize: '20px', fontWeight: 'bold', color: darkMode ? " #ffffff" : "#FF8FAB", fontFamily: "'Poppins', Bold", textAlign: 'left', marginBottom: '4px'})

const PostDetail = ({ darkMode }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
   const [message, setMessage] = useState(""); // State for success/error message
  const id = useParams().id;
  console.log(id);
    const [inputs, setinputs] = useState({})
    const handleChange = (e) => {
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:3000/api/post/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data; 
  }
  useEffect(() => {
    fetchDetails().then(data=> {
      setPost(data.post)
      setinputs({title: data.post.title, description: data.post.description, })
  })
  },[id])
  const sendRequest = async() => {
    const res = await axios.put(`http://localhost:3000/api/post/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err=>console.log(err));

    const data = await res.data; 
    return data; 
  }
  console.log(post);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => {
      if (data) {
          setMessage("Post updated successfully! Redirecting ...."); // Show success message

          // Redirect after 2 seconds
          setTimeout(() => navigate("/userposts"), 2000);
      } else {
          setMessage("Failed to update post. Please try again."); // Show error message
      }
  });
  }
  
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
    <Box 
       display="flex"
       justifyContent="center"
       alignItems="center"
       minHeight="500px"
       sx={{ 
           border: darkMode ? "3px solid #474747" :'3px solid #F2B8C2', 
           borderRadius: '20px',
           boxShadow: darkMode ? "10px 10px 20px rgba(0, 0, 0, 0.25)" :'10px 10px 20px #FFB6C1',
           padding: 3, 
           margin: 'auto', 
           marginTop: 3, 
           display: 'flex',
           flexDirection: 'column', 
           width: '600px', 
           backgroundColor: darkMode ? " #2E2E2E" : '#ffd7dd'
       }}
    >
        <Typography fontWeight={'bold'} variant="h3" textAlign={'center'} sx={{mb: 3, color: darkMode ? " #fff" : "#FF8FAB"}}>Update Your Post</Typography>
        <InputLabel sx={labelStyles(darkMode)}>Title</InputLabel>
        <TextField  name="title" 
                        onChange={handleChange} 
                        value={inputs.title} 
                        margin='normal' 
                        variant="outlined" 
                        fullWidth 
                        sx={{ backgroundColor: darkMode ? " #3B3B3B" : '#FFF0F5', borderRadius: '10px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: darkMode ? " #474747" : '#F1DFDD', }, '&:hover fieldset': { borderColor: darkMode ? " #fff" : '#EEAAC3', }, }, }}/>
        <InputLabel sx={labelStyles(darkMode)}>Description</InputLabel>
        <TextField  name="description" 
                        onChange={handleChange} 
                        value={inputs.description} 
                        margin='normal' 
                        variant="outlined" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        sx={{ backgroundColor: darkMode ? " #3B3B3B" : '#FFF0F5', borderRadius: '10px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: darkMode ? " #474747" : '#F1DFDD', }, '&:hover fieldset': { borderColor: darkMode ? " #fff" : '#EEAAC3', }, }, }}/>
        <Button   type="submit" 
                        variant="contained"  
                        sx={{
                            borderRadius:'20px',
                            padding: '8px 16px', 
                            marginTop: '16px', 
                            backgroundColor: darkMode ? " #4A4A4A" : "#FF8FAB",
                            color: "white", 
                            fontFamily: "'Poppins', Bold", 
                            fontWeight: 'bold',
                            fontSize: '14px', 
                            "&:hover": { color: darkMode ? "#808080" : "#FF1493" }, 
                        }} 
                    >Update</Button>
                   {message && (
                        <Typography 
                          sx={{ marginTop: 2, color: message.includes("successfully") ? "green" : "red", fontWeight: "bold" }}
                        >
                          {message}
                        </Typography>
                  )}
            </Box>
        </form>
    }</div>
  )
}

export default PostDetail