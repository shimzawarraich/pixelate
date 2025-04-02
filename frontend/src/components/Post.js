import { motion } from 'framer-motion';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ title, description, imageURL, userName, isUser, id, initialIsFavorite, initialLikes, handlePostDelete, darkMode, createdAt }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    deleteRequest()
      .then(() => {
        setOpenSnackbar(true); // Show success message before removing from UI
        setTimeout(() => handlePostDelete(id), 1000); // Delay removing post for better UX
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  // Toggle favorite state
  const handleFavoriteToggle = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId"); // Get logged-in user ID

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3000/api/post/${id}/favorite`, { userId });
      console.log("Favorite API Response:", response.data);

      // if (response.data && response.data.isFavorite !== undefined) {
      if (response.data && response.data.likedBy) {
        // setIsFavorite(response.data.isFavorite);
        setLikes(response.data.likes);
        setIsFavorite(response.data.likedBy.includes(userId)); // Update heart icon per user
      } else {
        console.error("Invalid response from server:", response);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current formatted date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // const currentDate = new Date();
  // const formattedDate = currentDate.toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
    <>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          margin: -1,
          padding: 1,
          boxShadow: "5px 5px 10px #FFB6C1",
          borderRadius: "16px",
          background: darkMode ? "#333" : "#F2B8C2",
          color: darkMode ? "#fff" : "#000",  
                    display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative", 
          overflow: "hidden", 
          ":hover": {
            boxShadow: '10px 10px 20px #FFB6C1',
          },
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
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ position: 'relative' }}>
          {/* Prevent liking own post */}
 
    <motion.div
      whileTap={{ scale: 0.9 }} // Subtle press effect
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
<IconButton 
  onClick={handleFavoriteToggle} 
  disabled={loading || isUser} // Disable if user owns the post
  sx={{ cursor: isUser ? "not-allowed" : "pointer", opacity: isUser ? 0.5 : 1 }}
>

  {isFavorite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />}

</IconButton>
</motion.div>
<Typography variant="body2" sx={{ marginLeft: "4px" }}>{likes}</Typography>

        </Box>

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#C58997" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader={formatDate(createdAt)}
          sx={{ textAlign: "left" }} // Ensures entire header is left-aligned

        />
        <CardMedia
          component="img"
          image={imageURL}
          alt="post image"
          sx={{ width: "100%", height: "300px", objectFit: "contain", borderRadius: "10px" }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: darkMode ? "#fff" : 'textSecondary' }}>
            <b>{userName}{":"}</b> {description}
          </Typography>
        </CardContent>
      </Card>

      {/* Custom Snackbar (Pink Themed) */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ backgroundColor: "#FF8FAB", color: "white", fontWeight: "bold" }}>
          Post successfully deleted!
        </Alert>
      </Snackbar>
    </>
     </motion.div>
  );
};

export default Post;
