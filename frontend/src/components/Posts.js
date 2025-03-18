import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/post");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data.posts));
  }, []);

  console.log("Fetched posts:", posts); // ✅ Debugging

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post 
            key={post._id}
            id={post._id}
            isUser={localStorage.getItem("userId") === post.user._id} 
            title={post.title} 
            description={post.description} 
            imageURL={post.image} 
            userName={post.user.name}
            initialIsFavorite={post.isFavorite} // ✅ Ensure this is passed
            initialLikes={post.likes} // ✅ Ensure likes count is passed
          />
        ))}
    </div>
  );
};

export default Posts;
