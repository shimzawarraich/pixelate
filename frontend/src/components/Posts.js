import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from "./Post"

const Posts = () => {
  const [posts, setPosts] = useState();
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:3000/api/post").catch(err=>console.log(err));
    const data = await res.data;
    return data; 
  }
  useEffect(() => {
    sendRequest().then((data) => setPosts(data.posts));
  }, [])
  console.log(posts);
  return ( 
    <div>
      {posts &&
        posts.map((post,index)=> 
          <Post 
            id={post._id}
            isUser={localStorage.getItem("userId") === post.user._id} title={post.title} description={post.description} imageURL={post.image} userName={post.user.name}
          /> 
        )}
    </div>
  )
}

export default Posts