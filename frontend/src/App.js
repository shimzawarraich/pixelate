import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import AddPosts from "./components/AddPosts";
import PostDetails from "./components/PostDetail";
import Login from "./components/Login"; 
//import OutfitCreator from "./components/OutfitCreator"; // Make sure to import OutfitCreator
//<Route path="/outfit-creator" element={<OutfitCreator />} /> {" "}
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/Login" element={<Login />} />
        ) : (
        <>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/posts/add" element={<AddPosts/>}/>
        <Route path="/userposts" element={<UserPosts/>}/>
        <Route path="/userposts/:id" element={<PostDetails/>}/>
        
        </>
        )}
      </Routes>
    </main>
  </React.Fragment>;
}

export default App;
