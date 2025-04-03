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
    const isLoggedIn = useSelector(state => state.login.isLoggedIn || localStorage.getItem("isLoggedIn") === "true");
    const [value, setValue] = useState();
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: darkMode ? "#333" : "#ffd7dd",
                // backgroundImage: darkMode ? "url('/background-noir.png')" : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "FFF0F5",
            }}
        >
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <img 
                        src={darkMode ? "/Logo-noir.png" : "/logo512.png"} // path for logo
                        alt="Pixelate Logo" 
                        style={{ width: 40, height: 40, marginRight: 10 }} 
                    />
                </Box>
                <Typography 
                    variant="h4"
                    sx={{
                        fontFamily: "'Poppins', cursive",
                        fontWeight: "bold", 
                        color: darkMode ? "#C3D491" : "#7e895e", 
                        textShadow: "2px 2px 5px rgba(179, 182, 128, 0.55)", 
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
                        TabIndicatorProps={{ style: { backgroundColor: darkMode ? "#F8F8FF" : "#FF8FAB" } }}
                    >
                        <Tab 
                            LinkComponent={Link} 
                            to="/posts" 
                            label="All Posts"
                            sx={{
                                fontFamily: "'Poppins'",
                                fontSize: "1rem", 
                                color: darkMode ? "#F8F8FF" : "#7e895e", 
                                "&:hover": {color: darkMode ? "#fff" : "#FF8FAB"}, 
                            }}
                        />
                        <Tab 
                            LinkComponent={Link} 
                            to="/userposts" 
                            label="My Posts"
                            sx={{
                                fontFamily: "'Poppins'",
                                fontSize: "1rem", 
                                color: darkMode ? "#F8F8FF" : "#7e895e", 
                                "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                            }}
                        />
                        <Tab 
                            LinkComponent={Link} 
                            to="/posts/add" 
                            label="Add Posts"
                            sx={{
                                fontFamily: "'Poppins'",
                                fontSize: "1rem", 
                                color: darkMode ? "#F8F8FF" : "#7e895e", 
                                "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                            }}
                        />
                        {/* New Tab for my Liked Posts */}
                        <Tab 
                            LinkComponent={Link} 
                            to="/liked" 
                            label="My Liked Posts" 
                            sx={{
                                fontFamily: "'Poppins'",
                                fontSize: "1rem", 
                                color: darkMode ? "#F8F8FF" : "#7e895e", 
                                "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                            }} />
                
                        {/* New Tab for Outfit Creator */}
                        <Tab 
                                LinkComponent={Link} 
                                to="/outfit" 
                                label="Try-On"
                                sx={{
                                    fontFamily: "'Poppins'",
                                    fontSize: "1rem", 
                                    color: darkMode ? "#F8F8FF" : "#7e895e", 
                                    "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                                }}
                        />
                        {/* New Tab for Closet */}
                        <Tab 
                                LinkComponent={Link} 
                                to="/closet" 
                                label="Closet"
                                sx={{
                                    fontFamily: "'Poppins'",
                                    fontSize: "1rem", 
                                    color: darkMode ? "#F8F8FF" :  "#7e895e", 
                                    "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                                }}
                        />

                        {/* New Tab for Help */}
                        <Tab 
                             LinkComponent={Link} 
                             to="/help" 
                             label="Help" 
                             sx={{
                                 fontFamily: "'Poppins'",
                                 fontSize: "1rem", 
                                 color: darkMode ? "#F8F8FF" : "#7e895e", 
                                 "&:hover": {color:  darkMode ? "#fff" : "#FF8FAB"}, 
                        }} />
                    </Tabs>
                </Box>}

                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            <Button 
                                LinkComponent={Link} 
                                to="/login"
                                variant="contained" 
                                sx={buttonStyles(darkMode)}
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate("/login?signup=true")} 
                                variant="contained" 
                                sx={buttonStyles(darkMode)} 
                            >
                                SignUp
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => {
                                playSound("/sounds/logout.mp3"); // Play the logout sound
                                dispatch(loginActions.logout());
                                // playSound("/sounds/logout.mp3"); // Play the logout sound

                            }}
                            LinkComponent={Link} 
                            to="/" 
                            variant="contained" 
                            sx={buttonStyles(darkMode)} 
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
const buttonStyles = (darkMode) => ({
    margin: 1, 
    borderRadius: 20,
    backgroundColor: darkMode ? "#444" : "#FF8FAB",  // Darker color in dark mode
    color: "#fff",
    fontFamily: "'Poppins', cursive",
    "&:hover": { backgroundColor: darkMode ? "#555" : "#FFB6C1", color: darkMode ? "#fff" : "#fff" }, 
});

export default Header;
