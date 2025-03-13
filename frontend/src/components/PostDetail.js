import { TextField, Typography, Box, InputLabel, Button } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles ={mb:1, mt:2, fontSize: '24px', fontWeight: 'bold'}

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
        border={3} 
        borderColor="#C58997" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3} 
        margin={"auto"} 
        marginTop={3}
        display='flex' 
        flexDirection={'column'} 
        width={"80%"}
    >
        <Typography fontWeight={'bold'} padding={3} color="grey" variant="h2" textAlign={'center'}>Post Your Posts</Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant="outlined"/>
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant="outlined"/>
        <Button   sx={{
                    mt:2,
                    borderRadius:4, 
                    marginTop: 3, 
                    color: "#FF8FAB", 
                    fontFamily: "'Poppins', cusrive", 
                    fontWeight: 500, 
                    "&:hover": { color: "#FF6F91" }, 
                }} variant="contained" color="#FF8FAB" type="submit">Post</Button>
    </Box>
</form>
}</div>
  )
}

export default PostDetail