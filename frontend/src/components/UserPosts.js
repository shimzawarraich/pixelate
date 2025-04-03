import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from "./Post";
import { Typography, Box, Grid } from '@mui/material';

const UserPosts = ({darkMode}) => {
  const [user, setUser] = useState(null); // Ensure user starts as null
  const id = localStorage.getItem("userId");

  // Function to fetch posts
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/post/user/${id}`);
      setUser(res.data.user); // Update user state with fetched data
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [id]);

  // Function to remove post from UI after deletion
  const handlePostDelete = (postId) => {
    setUser(prevUser => ({
      ...prevUser,
      posts: prevUser.posts.filter(post => post._id !== postId) // Remove post from state
    }));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ margin: 'auto', marginTop: 3, width: '100%', maxWidth: '1200px' }}> 
      <Typography variant='h3' 
      sx = {{
        fontWeight:'bold', color:'#FF8FAB', fontFamily:"'Poppins', bold", marginBottom: 3,
        backgroundColor: darkMode ? "rgba(96, 84, 86, 0.5)" :"rgba(255, 215, 221, 0.5)", // Translucent #FFD7DD
        padding: "5px 10px", // Adds spacing around the text
        borderRadius: "5px", // Softens edges
      }}
      >
        Your Posts
      </Typography>
      
      <Box width="100%">
        <Grid container spacing={7} justifyContent="flex-start">
          {user && user.posts && user.posts.length > 0 ? (
            user.posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Post 
                  id={post._id} 
                  key={index} 
                  isUser={true} 
                  title={post.title} 
                  description={post.description} 
                  imageURL={post.image} 
                  userName={user.name} 
                  handlePostDelete={handlePostDelete} // Pass function to Post component
                  createdAt={post.createdAt} // Pass the creation date to Post component

                />
              </Grid>
            ))
          ) : (
            <Typography 
  variant="h5" 
  sx={{
    color: darkMode ? "#F2BBCC" : "#FF8FAB", 
    fontWeight: "bold", 
    fontSize: "24px", // Slightly Larger Text
    textAlign: "center", 
    fontFamily: "'Dancing Script', cursive", // Elegant Font
    // backgroundColor: "#FFE4E1", // Light Pink Background
    backgroundColor: darkMode ? "rgba(62, 55, 55, 0.5)" : "rgba(255, 228, 225, 0.5)",    
    padding: "15px", 
    borderRadius: "12px", 
    boxShadow: darkMode ? "5px 5px 15px rgba(255, 182, 193, 0.1)" : "5px 5px 15px rgba(255, 182, 193, 0.5)",
    maxWidth: "60%", 
    margin: "50px auto", // Moves it lower on the page
    transition: "all 0.3s ease-in-out", // Smooth Animation Effect
  }}
>
  🌸 You haven't posted anything yet. Create something beautiful! ✨
</Typography>

          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserPosts;
