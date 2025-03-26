import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import AddPosts from "./components/AddPosts";
import PostDetails from "./components/PostDetail";
import Login from "./components/Login";
import Outfit from "./components/Outfit";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <React.Fragment>
        <header>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {!isLoggedIn ? (
              <Route path="*" element={<Navigate to="/login" replace />} />
            ) : (
              <>
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/add" element={<AddPosts />} />
                <Route path="/userposts" element={<UserPosts />} />
                <Route path="/userposts/:id" element={<PostDetails />} />
                <Route path="/outfit" element={<Outfit />} />
              </>
            )}
          </Routes>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
