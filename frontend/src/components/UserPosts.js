import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from "./Post"
import { Typography, Box } from '@mui/material'

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
    <Box textAlign='center' p={3}> 
      <Typography variant='h3' fontWeight='bold' color='#FF8FAB' fontFamily="'Poppins', cusrive">
        Your Posts
      </Typography>
      <Box>
      {user && user.posts && user.posts.map((post, index) => (
      <Post id={post._id} key={index} isUser={true} title={post.title} description={post.description} imageURL={post.image} userName={user.name} />
      ))}
      </Box>
    </Box>
  )
}

export default UserPosts