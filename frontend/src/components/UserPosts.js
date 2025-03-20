import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from "./Post"
import { Typography, Box, Grid } from '@mui/material'

const UserPosts = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:3000/api/post/user/${id}`).catch(err=>console.log(err))
    const data = await res.data; 
    return data 
  }
  useEffect(() => {
     sendRequest().then((data)=> setUser(data.user))
   },[])
   console.log(user);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ margin: 'auto', marginTop: 3, width: '100%', maxWidth: '1200px'}}> 
      <Typography variant='h3' fontWeight='bold' color='#FF8FAB' fontFamily="'Poppins', bold" sx={{ marginBottom: 3 }}>
        Your Posts
      </Typography>
      <Box width="100%">
      <Grid container spacing={7} justifyContent="flex-start">
      {user && user.posts && user.posts.map((post, index) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
      <Post id={post._id} key={index} isUser={true} title={post.title} description={post.description} imageURL={post.image} userName={user.name} />
      </Grid>
      ))}
      </Grid>
      </Box>
    </Box>
  )
}

export default UserPosts