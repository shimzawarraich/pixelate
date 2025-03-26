import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import AddPosts from "./components/AddPosts";
import PostDetails from "./components/PostDetail";
import Login from "./components/Login";
import Outfit from "./components/Outfit";

import React from "react";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {/* Always include the login route (handles both login & signup) */}
          <Route path="/login" element={<Login />} />

          {/* If not logged in, redirect to login */}
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
  );
}

export default App;
