import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from "./Post";
import { motion } from 'framer-motion';
import { BsSearch } from 'react-icons/bs';
import { TextField, Select, MenuItem, Box, Typography, Grid, InputLabel, FormControl, IconButton, Button, InputAdornment} from '@mui/material';

const Posts = ({darkMode}) => {
  const [posts, setPosts] = useState([]);
  const [productCategories, setProductCategories] = useState( [ "Top", "Pant", "Skirt", "Hijab", "Hat", "Dress"])
  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false); 

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams; 

      if (searchVal) {
        params.append('search', searchVal); 
      }
      if (selectedCategory !== "All") {
        params.append('category', selectedCategory);
      }

      const res = await axios.get(`http://localhost:3000/api/post?${params.toString()}`); 
      const data = await res.data;
      setPosts( data.posts || []); // posts is always an array, no error when no posts
    } catch (err) {
      console.log("Error fetching posts:", err);
      setPosts([]); // fallback in event of an error
    }
  };

  useEffect(() => {
    // fetchPosts().then((data) => setPosts(data.posts));
    const timer = setTimeout(() => {
    fetchPosts();
  }, 500);
    return () => clearTimeout(timer); 
  }, [searchVal, selectedCategory]);

  const handleSearchClick = () => {
    fetchPosts(); 
  }
  
  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); 
    }
  }

  const handleResetFilters = () => {
    setSearchVal("");
    setSelectedCategory("All");
  }

  //console.log("Fetched posts:", posts);

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4}}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            sx={{backgroundColor: darkMode ? "rgba(51, 51, 51, 0.85)" : "rgba(255, 215, 221, 0.85)", borderRadius: '12px',}}
          >
            {productCategories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
          </FormControl>
    
          <TextField 
            label="Search"
            variant="outlined"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ width: '300px',  '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#FF8FAB' : '#5a3d3d', 
              borderWidth: '1px', 
            }, backgroundColor: darkMode ? "rgba(51, 51, 51, 0.85)" :"rgba(255, 215, 221, 0.85)", borderRadius: '12px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick}>
                    <BsSearch style={{ color: darkMode ? "#FFFFFF" : "#FF8FAB" }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.70 }}
          >
          <Button 
            variant="outlined" 
            onClick={handleResetFilters}
            sx={{
              minWidth: '120px',
              backgroundColor: darkMode ? "#444" : "#FF8FAB", 
              color: darkMode ? "#FFFFFF" : '#ffffff', 
              '&:hover': {
                backgroundColor: darkMode ? "rgba(51, 51, 51, 0.85)" : '#ff9eb5', 
                transform: 'scale(1.02)', 
              },
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px', 
              boxShadow:  darkMode ? "0 4px 8px rgba(28, 28, 28, 0.85)" :'0 4px 8px rgba(255, 158, 181, 0.3)',
              height: '56px',
              px: 3,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              border: darkMode ? "2px solid rgba(51, 51, 51, 0.85)" : '2px solid rgba(255, 158, 181, 0.3)', 
              fontFamily: '"Poppins"', 
            }}
          >
            Show All
          </Button>
          </motion.div>
        </Box>
    
        {showFilters && (
          <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: 2, padding: 2}}>
        </Box>
        </Box>
      )}
      <Box>
      <Grid container spacing={7} justifyContent="center">
      {posts.length > 0 ? (
         posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Post 
            id={post._id}
            isUser={localStorage.getItem("userId") === post.user._id} 
            title={post.title} 
            description={post.description} 
            imageURL={post.image} 
            userName={post.user.name}
            darkMode={darkMode} 
            // initialIsFavorite={post.isFavorite}
            initialIsFavorite={post.likedBy.includes(localStorage.getItem("userId"))} // Fix heart per user
            initialLikes={post.likes}
            createdAt={post.createdAt}
          />
          </Grid>
        ))
      ) : (
          <Typography 
          variant="h5" 
          sx={{
            color: darkMode ? "#fff" : "#FF8FAB", // Soft Pink
            fontWeight: "bold", 
            fontSize: "24px", // Slightly Larger Text
            textAlign: "center", 
            fontFamily: "'Dancing Script', cursive", // Elegant Font
            backgroundColor: darkMode ? "#333" : "#FFE4E1", // Light Pink Background
            padding: "15px", 
            borderRadius: "12px", 
            boxShadow: darkMode ? "5px 5px 15px #212121" : "5px 5px 15px rgba(255, 182, 193, 0.5)", // Soft Glow
            maxWidth: "60%", 
            margin: "50px auto", // Moves it lower on the page
            transition: "all 0.3s ease-in-out", // Smooth Animation Effect
          }}
        >
           🌸 No posts found match your criteria ✨
        </Typography>
      )}
        </Grid>
        </Box>
      </Box>
  );
};

export default Posts;
