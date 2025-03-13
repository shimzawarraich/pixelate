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
            background: "#C58997",
            boxShadow: 'FFF0F5',
        }}
    >
        <Toolbar>
            <Typography 
                variant='h4'
                sx={{
                    fontFamily: "'Poppins', cusrive",
                    fontWeight: "bold", 
                    color: "#fff", 
                    textShadow: "2px 2px 5px rgba(255, 255, 255, 0.8)", 
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
                                color: "#fff", 
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
                                color: "#fff", 
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
                                color: "#fff", 
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