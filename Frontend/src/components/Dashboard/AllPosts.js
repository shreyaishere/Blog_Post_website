import React, { useState, useEffect } from "react";
import axios from "axios";
// import './../../App.css'
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        // const res = await axios.get("http://localhost:5000/api/posts/myposts", {
        const res = await axios.get("https://blog-post-website-j5f0.onrender.com/api/posts/myposts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            className="post-card"
            key={post._id}
            onClick={() => navigate(`/${post._id}`)}
          >
            <div className="img-area">
              <img src={post.image} alt={post.title} />
            </div>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
