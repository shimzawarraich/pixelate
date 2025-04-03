import { motion } from 'framer-motion';
import {Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import AddPosts from "./components/AddPosts";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login"; 
import LandingPage from "./components/LandingPage";
// import TryOn from "./components/TryOn"; 
import LikedPosts from "./components/LikedPosts";
import Outfit from "./components/Outfit"; 
import Closet from "./components/Closet";
import { AnimatePresence } from "framer-motion";
import Help from "./components/Help"; // Import the Help component


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  
  const isLoggedIn = useSelector(state => state.login.isLoggedIn || localStorage.getItem("isLoggedIn") === "true");
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon){
      favicon.href = darkMode ? '/darkfavicon.ico' : '/favicon.ico';
    }
    // if (darkMode) {
    //   document.body.classList.add("dark-mode");
    // } else {
    //   document.body.classList.remove("dark-mode");
    // }
    document.body.style.backgroundImage = darkMode
        ? "url('/background-noir.png')" 
        : "url('/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";
    document.body.style.width = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundAttachment = "fixed"; // Ensures background stays consistent when scrolling
    document.body.style.position = "relative";

    localStorage.setItem("darkMode", darkMode);

  }, [darkMode]);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: { default: "#ffffff" },
      text: { primary: "#000000" },
    },
  });
  

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#121212" },
      text: { primary: "#ffffff" },
    },
  });
  

  // console.log(isLoggedIn);
  return (
    <React.Fragment>
  {/* Gradient overlay div - place this right after opening <body> */}
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ 
    opacity: 1,
    backdropFilter: isLoggedIn ? 'blur(4px)' : 'blur(8px)',
    WebkitBackdropFilter: isLoggedIn ? 'blur(4px)' : 'blur(8px)',
  }}
  transition={{ duration: 0.5 }}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: darkMode
      ? isLoggedIn 
        ? 'linear-gradient(135deg, rgba(50,50,50,0.4) 0%, rgba(35,35,35,0.6) 100%)'
        : 'linear-gradient(135deg, rgba(40,40,40,0.7) 0%, rgba(25,25,25,0.9) 100%)'
      : isLoggedIn
        ? 'linear-gradient(135deg, rgba(255,240,245,0.4) 0%, rgba(255,245,250,0.6) 100%)'
        : 'linear-gradient(135deg, rgba(255,230,240,0.6) 0%, rgba(255,240,245,0.9) 100%)',
    zIndex: -1,
  }}
/>
   <header>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
  </header>
  
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <React.Fragment>
    <main>
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={isLoggedIn ? <Navigate to="/posts" replace /> : <LandingPage />} 
              />
        <Route path="/Login" element={<Login />} />
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
        <>
        <Route path="/posts" element={<Posts darkMode={darkMode}/>}/>
        <Route path="/posts/add" element={<AddPosts/>}/>
        <Route path="/userposts" element={<UserPosts darkMode={darkMode}/> }/>
        <Route path="/userposts/:id" element={<PostDetail darkMode={darkMode}/>}/>
        {/* <Route path="/userposts/:id" element={<PostDetail darkMode={darkMode}/>}/> */}
        {/* <Route path="/tryOn" element={<TryOn/>}/> */}
        <Route path="/liked" element={<LikedPosts darkMode={darkMode}/>} />
        <Route path="/outfit" element={<Outfit darkMode={darkMode}/>}/>
        <Route path="/closet" element={<Closet darkMode={darkMode}/>}/>
        <Route path="/help" element={<Help darkMode={darkMode}/>} />  {/* Add Help Page */}



        </>
        )}


      </Routes>
      </AnimatePresence>
    </main>
  </React.Fragment>
  </ThemeProvider>
  </React.Fragment>
  );
}

export default App;
