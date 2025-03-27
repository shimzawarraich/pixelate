import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store";
import DarkModeIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/WbSunny";

const Header = ({ darkMode, setDarkMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value, setValue] = useState();

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: darkMode ? "#333" : "#ffd7dd",
                boxShadow: "FFF0F5",
            }}
        >
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <img 
                        src="/logo512.png"
                        alt="Pixelate Logo" 
                        style={{ width: 40, height: 40, marginRight: 10 }} 
                    />
                </Box>
                <Typography 
                    variant="h4"
                    sx={{
                        fontFamily: "'Poppins', cursive",
                        fontWeight: "bold", 
                        color: darkMode ? "#fff" : "#7e895e", 
                        textShadow: "2px 2px 5px rgba(179, 182, 128, 0.8)", 
                    }}
                >
                    Pixelate
                </Typography>

                {isLoggedIn && (
                    <Box display="flex" marginLeft="auto" marginRight="auto">
                        <Tabs 
                            textColor="inherit"
                            value={value} 
                            onChange={(e, val) => setValue(val)}
                            TabIndicatorProps={{ style: { backgroundColor: darkMode ? "#ffcccb" : "#FF8FAB" } }}
                        >
                            <Tab LinkComponent={Link} to="/posts" label="All Posts" sx={tabStyles} />
                            <Tab LinkComponent={Link} to="/userposts" label="My Posts" sx={tabStyles} />
                            <Tab LinkComponent={Link} to="/posts/add" label="Add Posts" sx={tabStyles} />
                            <Tab LinkComponent={Link} to="/liked" label="My Liked Posts" sx={tabStyles} />
                            <Tab LinkComponent={Link} to="/outfit" label="Try-On" sx={{ ...tabStyles, color: "#fff" }} />
                        </Tabs>
                    </Box>
                )}

                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            <Button 
                                LinkComponent={Link} 
                                to="/login"
                                variant="contained" 
                                sx={buttonStyles}
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate("/login?signup=true")} 
                                variant="contained" 
                                sx={buttonStyles} 
                            >
                                SignUp
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(loginActions.logout())}
                            LinkComponent={Link} 
                            to="/login" 
                            variant="contained" 
                            sx={buttonStyles} 
                        >
                            Logout
                        </Button>
                    )}

                    {/* Dark Mode Toggle Button */}
                    <Button 
                        onClick={() => setDarkMode(!darkMode)}
                        sx={{
                            marginLeft: 2,
                            backgroundColor: darkMode ? "#444" : "#ffcccb",
                            color: darkMode ? "#fff" : "#000",
                            borderRadius: 20,
                            "&:hover": { backgroundColor: darkMode ? "#555" : "#ffb6c1" },
                        }}
                    >
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Reusable styles
const buttonStyles = {
    margin: 1, 
    borderRadius: 20,
    backgroundColor: "#FF8FAB", 
    color: '#fff', 
    fontFamily: "'Poppins', cusrive",
    "&:hover": { backgroundColor: "#FFB6C1" }, 
};

const tabStyles = {
    fontFamily: "'Poppins', cusrive",
    fontSize: "1rem", 
    color: "#7e895e", 
    "&:hover": { color: "#FF8FAB" }, 
};

export default Header;
