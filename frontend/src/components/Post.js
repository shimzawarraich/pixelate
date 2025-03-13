import{ Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Post = ({title, description, imageURL, userName, isUser, id}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/userposts/${id}`);
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3000/api/post/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
    deleteRequest().then((data) => console.log(data));
  }
  return (
    <div><Card sx={{ 
         width: "50%", 
         margin: 'auto', 
         mt:2, 
         adding: 2, 
         boxShadow: "5px 5px 10px #ccc", 
         borderRadius: "20px",
         backgroundColor: "#DADEE1", 
         ":hover": {
           boxShadow: "10px 10px 20px #DADEE1"
        },  
    }}>

    {isUser && (
      <Box display='flex'>
        <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
          <EditIcon color='secondary'/>
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color='error'/>
        </IconButton>
      </Box>
    )}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "#FF69B4" }} aria-label="recipe">
          {userName.charAt(0)}
        </Avatar>
      }
      title={title}
      subheader="September 14, 2016"
    />
    <CardMedia
      component="img"
      height="200"
      image={imageURL}
      alt="post image"
      sx={{borderRadius: "10px"}}
    />
    <CardContent>
      <Typography variant="body2" sx={{ color: 'textSecondary' }}>
        <b>{userName}{":"}</b> {description}
      </Typography>
    </CardContent>
  </Card></div>
  )
}

export default Post