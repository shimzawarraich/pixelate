import React, { useState } from 'react';
import{AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store';


const Header = () => {
    const dispath = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value, setValue] = useState()
  return (
    <AppBar 
        position="sticky" 
        sx={{
            background: "#ffd7dd",
            boxShadow: 'FFF0F5',
        }}
    >
        <Toolbar>
            <Box display="flex" alignItems="center">
                {/* Add the logo image here */}
                <img 
                    src="/logo512.png" // path for your logo
                    alt="Pixelate Logo" 
                    style={{
                        width: 40,   // Adjust width to fit your design
                        height: 40,  // Adjust height to fit your design
                        marginRight: 10,  // Add some spacing between the logo and the text
                    }} 
                />
                </Box>
            <Typography 
                variant='h4'
                sx={{
                    fontFamily: "'Poppins', cusrive",
                    fontWeight: "bold", 
                    color: "#7e895e", 
                    textShadow: "2px 2px 5px rgba(179, 182, 128, 0.8)", 
                }}
            
            >
                Pixelate
            
            </Typography>

            { isLoggedIn && 
                <Box display="flex" marginLeft={"auto"} marginRight={("auto")}>
                    <Tabs 
                        textColor='inherit' 
                        value={value} 
                        onChange={(e, val)=>setValue(val)}
                        TabIndicatorProps={{ style: {backgroundColor: "#FF8FAB" }}}
                    >
                        <Tab 
                            LinkComponent={Link} 
                            to="/posts" 
                            label="All Posts"
                            sx={{
                                fontFamily: "'Poppins', cusrive",
                                fontSize: "1rem", 
                                color: "#7e895e", 
                                "&:hover": {color: "#FF8FAB"}, 
                            }}
                        />
                        <Tab 
                            LinkComponent={Link} 
                            to="/userposts" 
                            label="My Posts"
                            sx={{
                                fontFamily: "'Poppins', cusrive",
                                fontSize: "1rem", 
                                color: "#7e895e", 
                                "&:hover": {color: "#FF8FAB"}, 
                            }}
                        />
                        <Tab 
                            LinkComponent={Link} 
                            to="/posts/add" 
                            label="Add Posts"
                            sx={{
                                fontFamily: "'Poppins', cusrive",
                                fontSize: "1rem", 
                                color: "#7e895e", 
                                "&:hover": {color: "#FF8FAB"}, 
                            }}
                        />
                        {/* New Tab for Outfit Creator */}
                        <Tab 
                                LinkComponent={Link} 
                                to="/outfit" 
                                label="Try-On"
                                sx={{
                                    fontFamily: "'Poppins', cusrive",
                                    fontSize: "1rem", 
                                    color: "#7e895e", 
                                    "&:hover": {color: "#FF8FAB"}, 
                                }}
                        />
                        {/* New Tab for OutfitMaker */}
                        <Tab 
                                LinkComponent={Link} 
                                to="/closet" 
                                label="Closet"
                                sx={{
                                    fontFamily: "'Poppins', cusrive",
                                    fontSize: "1rem", 
                                    color: "#7e895e", 
                                    "&:hover": {color: "#FF8FAB"}, 
                                }}
                        />
                    </Tabs>
                </Box>}

        <Box display="flex" marginLeft = "auto">
            { !isLoggedIn && 
                <> 
                    <Button 
                        LinkComponent={Link} 
                        to="/Login" 
                        variant="contained" 
                        sx={{
                            margin: 1, 
                            borderRadius: 20, 
                            backgroundColor: "#FF8FAB", 
                            color: '#fff', 
                            fontFamily: "'Poppins', cusrive",
                            "&:hover": { backgroundColor: "#FFB6C1"}, 
                        }}
                    >
                Login
            </Button>
            <Button 
                LinkComponent={Link} 
                to="/Login" 
                variant="contained" 
                sx={{
                    margin: 1, 
                    borderRadius: 20,
                    backgroundColor: "#FF8FAB", 
                    color: '#fff', 
                    fontFamily: "'Poppins', cusrive",
                    "&:hover": { backgroundColor: "#FFB6C1"}, 
                }} 
            >
                    SignUp
                </Button>
            </>
        }
                { isLoggedIn && 
                    <Button
                        onClick={()=>dispath(loginActions.logout())}
                        LinkComponent={Link} 
                        to="/Login" 
                        variant="contained" 
                        sx={{
                            margin: 1, 
                            borderRadius: 20,
                            backgroundColor: "#FF8FAB", 
                            color: '#fff', 
                            fontFamily: "'Poppins', cusrive",
                            "&:hover": { backgroundColor: "#FFB6C1"}, 
                        }} 
                    >
                    Logout
                </Button>
                }
            </Box>
        </Toolbar>
    </AppBar>
  )
};

export default Header;