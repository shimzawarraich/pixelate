import { TextField, Typography, Box, InputLabel, Button } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles ={mb:1, mt:2, fontSize: '20px', fontWeight: 'bold', color: "#FF8FAB", fontFamily: "'Poppins', Bold", textAlign: 'left', marginBottom: '4px'}

const PostDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
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
    sendRequest().then((data) =>console.log(data)).then(()=>navigate("/myPosts/"));
  }
  
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
    <Box 
        display='flex' 
        justifyContent="center"
        alignItems="center"
        minHeight="500px"
        sx={{
          border: '3px solid #EEAAC3',
          borderRadius: '20px', 
          boxShadow: '10px 10px 20px #FFB6C1',
          padding: 3, 
          margin: 'auto',
          marginTop: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          width: '600px', 
          backgroundColor: '#FEFAF9'
        }}
    >
        <Typography fontWeight={'bold'} color="#FF8FAB" variant="h3" textAlign={'center'} sx={{mb: 3}}>Update Your Post</Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant="outlined" fullWidth sx={{
          backgroundColor: '#FFF0F5', 
          borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#F1DFDD' },
            '&:hover fieldset': { borderColor: '#EEAAC3' },
          },
        }}/>
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant="outlined" fullWidth multiline rows={4} sx={{
           backgroundColor: '#FFF0F5',
           borderRadius: '10px',
           '& .MuiOutlinedInput-root': {
             '& fieldset': { borderColor: '#F1DFDD' },
             '&:hover fieldset': { borderColor: '#EEAAC3' },
           },
        }}/>
        <Button sx={{
                    borderRadius: '20px',
                    padding: '8px 16px',  
                    marginTop: '16px',
                    backgroundColor: "#FF8FAB",  
                    color: "white", 
                    fontFamily: "'Poppins', Bold", 
                    fontWeight: 'bold',
                    fontSize: '14px',  
                    "&:hover": { color: "#FF1493" }, 
                }} variant="contained" type="submit">Update</Button>
    </Box>
</form>
}</div>
  )
}

export default PostDetail