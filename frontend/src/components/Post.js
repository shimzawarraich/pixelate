import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ title, description, imageURL, userName, isUser, id, initialIsFavorite, initialLikes }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/userposts/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/post/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    deleteRequest().then((data) => console.log(data));
  }

  // Toggle favorite state
  const handleFavoriteToggle = async() => {
    try {
        const response = await axios.patch(`http://localhost:3000/api/post/${id}/favorite`);
        console.log("Favorite API Response:", response.data); // ✅ Debugging

        if (response.data && typeof response.data.isFavorite !== "undefined") {
            setIsFavorite(response.data.isFavorite); // ✅ Ensure state updates correctly
            setLikes(response.data.likes); // ✅ Update likes count
        } else {
            console.error("Invalid response from server:", response);
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
    setLoading(false);
};

  return (
    <Card
      sx={{
        width: "50%",
        margin: 'auto',
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        borderRadius: "20px",
        backgroundColor: "#DADEE1",
        ":hover": {
          boxShadow: "10px 10px 20px #DADEE1"
        },
        position: "relative"
      }}
    >
      {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
            <EditIcon color='secondary' />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color='error' />
          </IconButton>
        </Box>
      )}

      {/* Heart Icon Button for Favorite with Likes Count */}
      <Box display="flex" alignItems="center" sx={{ position: 'absolute', bottom: 10, right: 10 }}>
        <IconButton onClick={handleFavoriteToggle} disabled={loading}>
          {isFavorite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />}
        </IconButton>
        <Typography variant="body2">{likes}</Typography>
      </Box>

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

export default Post;
