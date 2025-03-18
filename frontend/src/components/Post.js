import{ Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import React, { useState } from 'react';

// import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Post = ({title, description, imageURL, userName, isUser, id, initialIsFavorite}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite); // Track the favorite state

  const handleEdit = (e) => {
    navigate(`/userposts/${id}`);
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3000/api/post/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
    deleteRequest()
    .then(()=>navigate("/"))
    .then(()=>navigate('/posts'));
  }
  const handleFavoriteToggle = async() => {
    try {
      const response = await axios.post(`http://localhost:3000/api/post/${id}/favorite`);
      setIsFavorite((prev) => !prev); // Toggle favorite state
      // Optionally, you can send this information to a backend (like saving it in the DB)
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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
        position: "relative",  // This is important to position the heart icon correctly
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

    {/* Heart Icon Button */}
    <IconButton onClick={handleFavoriteToggle} sx={{ position: 'absolute', bottom: 10, right: 10 }}>
      {isFavorite ? (
        <FavoriteIcon color='error' />  // Filled heart when favorite
      ) : (
        <FavoriteBorderIcon color='error' />  // Empty heart when not favorite
      )}
    </IconButton>

    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "#FF69B4" }} aria-label="recipe">
          {userName.charAt(0)}
        </Avatar>
      }
      title={title}
      subheader="Fashionista"
    />
    <CardMedia
      component="img"
      height="200"
      image={imageURL}
      alt="post image"
      sx={{borderRadius: "10px"}}
    />
    <CardContent>
      <hr />
      <br />
      <Typography variant="body2" sx={{ color: 'textSecondary' }}>
        <b>{userName}{":"}</b> {description}
      </Typography>
    </CardContent>
  </Card></div>
  )
}

export default Post