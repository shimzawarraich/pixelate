import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from "./Post";
import { BsSearch } from 'react-icons/bs';
import { TextField, Select, MenuItem, Box, Typography, Grid, InputLabel, FormControl, IconButton } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [productListItems, setProductListItems] = useState( [ "T-shirt", "Tank top", "Blouse", "Button-up shirt", "Polo shirt", "Hoodie", "Sweater", "Cardigan", "Crop top", "Tunic", 
      "Jeans", "Trousers", "Sweatpants", "Joggers", "Leggings", "Skirt", "Shorts", "Cargo pants",
      "Maxi dress", "Mini dress", "Bodycon dress", "Jumpsuit", "Overalls", "Denim Jacket", "Leather jacket", 
      "Blazer", "Trench coat", "Puffer jacket", "Varsity jacket", "Coats", "Winter jacket", 
      "Sneakers", "Boots", "Heels", "Flats", "Sandals", "Slippers", "Beanie", "Baseball cap", "Bucket hat", 
      "Scarf", "Hijab", "Gloves", "Belt", "Sock", "Necklace", "Ring", "Braclet", "Backpack", "Handbag", "Purse", 
      "Tote bag", "Glasses", "Sunglasses"   
  ])
  const [productListColors, setProductListColors] = useState([ "White", "Black", "Grey", "Beige", "Brown", "Cream", "Red", "Blue", "Yellow", "Green", 
      "Orange", "Purple", "Baby Blue", "Lavender", "Blush Pink", "Burgundy", "Sage green", "Peach",
      "Light brown", "Light red", "Baby pink", "Army green", "Olive green", "Rust", "Mustard", 
      "Turquoise", "Gold", "Silver", "Bronze", "Rose Gold", "Neon pink", 
      "Orange"  
  ])
  const [searchVal, setSearchVal] = useState("");
  const [filteredItems, setFilteredItems] = useState(productListItems); 
  const [filteredColors, setFilteredColors] = useState(productListColors);
  const [filterType, setFilterType] = useState("items");
  const [showFilters, setShowFilters] = useState(false); 

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/post?search=${searchVal}&filter=${filterType}`)
      const data = await res.data;
      setPosts(data.posts);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data.posts));
  }, []);

  const handleSearchClick = () => {
    if (searchVal === '') {
      setFilteredItems(productListItems);
      setFilteredColors(productListColors);
      return;
    }  

    if (filterType === "items") {
    const filterBySearch = productListItems.filter((item) =>
      item.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredItems(filterBySearch);
  } else if (filterType === "colors") {
    const filterBySearchColour = productListColors.filter((item) =>
      item.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredColors(filterBySearchColour);
    }
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setSearchVal('');
  }



  console.log("Fetched posts:", posts);

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4}}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Filter By"
          >
            <MenuItem value="items">Items</MenuItem>
            <MenuItem value="colors">Colors</MenuItem>
          </Select>
          </FormControl>
    
          <TextField 
            label="Search"
            variant="outlined"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            sx={{ width: '300px' }}
          />
          <IconButton onClick={handleSearchClick}>
          <BsSearch/>
          </IconButton>
    
    <IconButton onClick={() => setShowFilters(!showFilters)}>
            <Typography variant="body1">{showFilters ? 'Hide Filters' : 'Show Filters'}</Typography>
          </IconButton>
        </Box>
    
        {showFilters && (
          <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            Filtered {filterType === "items" ? "Items" : "Colors"}
          </Typography>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: 2, padding: 2}}>
            {(filterType === "items" ? filteredItems : filteredColors).map((item, index) => (
          <Typography key={index} sx={{ padding: 1, borderBottom: '1px solid #eee'}}>
              {item}
          </Typography>
        ))}
        </Box>
        </Box>
      )}
      <Box>
      <Grid container spacing={7} justifyContent="center">
      {posts &&
        posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Post 
            key={post._id}
            id={post._id}
            isUser={localStorage.getItem("userId") === post.user._id} 
            title={post.title} 
            description={post.description} 
            imageURL={post.image} 
            userName={post.user.name}
            initialIsFavorite={post.isFavorite}
            initialLikes={post.likes} 
          />
          </Grid>
        ))}
        </Grid>
        </Box>
      </Box>
  );
};

export default Posts;
