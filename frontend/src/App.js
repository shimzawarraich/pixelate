import {Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import AddPosts from "./components/AddPosts";
import PostDetails from "./components/PostDetail";
import Login from "./components/Login"; 
// import TryOn from "./components/TryOn"; 
import LikedPosts from "./components/LikedPosts";
import Outfit from "./components/Outfit"; 
import Closet from "./components/Closet";
import Welcome from "./components/welcome";





import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn || localStorage.getItem("isLoggedIn") === "true");

  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [hasSeenWelcome, setHasSeenWelcome] = useState(
    localStorage.getItem("hasSeenWelcome") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <React.Fragment>
      <header>
          {hasSeenWelcome && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}
      </header>
    <main>
      <Routes>
      {!hasSeenWelcome ? (
              <Route
                path="/"
                element={
                  <Welcome
                    onGetStarted={() => {
                      localStorage.setItem("hasSeenWelcome", "true");
                      setHasSeenWelcome(true);
                    }}
                  />
                }
              />
            ) : null}
        
        <Route path="/Login" element={<Login />} />
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
        <>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/posts/add" element={<AddPosts/>}/>
        <Route path="/userposts" element={<UserPosts/>}/>
        <Route path="/userposts/:id" element={<PostDetails/>}/>
        {/* <Route path="/tryOn" element={<TryOn/>}/> */}
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/outfit" element={<Outfit/>}/>
        <Route path="/closet" element={<Closet/>}/>
        </>
        )}
      </Routes>
    </main>
  </React.Fragment>
  </ThemeProvider>
  );
}

export default App;
