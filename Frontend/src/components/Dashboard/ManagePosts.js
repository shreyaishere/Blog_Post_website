import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
// import './../../App.css'
import "./Dashboard.css";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);


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
   useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(prev => prev.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const handleEditsave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { _id, title, image, content } = editingPost;

      const res = await axios.put(
        `http://localhost:5000/api/posts/${_id}`,
        {
          title,
          image,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPosts((prev) =>
        prev.map((post) => (post._id === _id ? res.data : post))
      );

      setEditingPost(null);
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  const handleChange = (e) => {
    setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1> Manage Posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <img src={post.image} alt={post.title} />
            <h3>{post.title.substring(0, 20)}...</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-actions">
              <button className="edit-btn"
                onClick={() => setEditingPost(post)}
                >
                <FaEdit /> Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(post._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="modal-backdrop">
          <div className="edit-modal">
            <h3>Edit Post</h3>
            <input
              type="text"
              name="title"
              value={editingPost.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="image"
              value={editingPost.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <textarea
              name="content"
              value={editingPost.content}
              onChange={handleChange}
              placeholder="Content"
              rows="5"
            />
            <div className="modal-buttons">
            <button onClick={handleEditsave}>Save </button>
            <button onClick={() => setEditingPost(null)}>Cancel</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
export default ManagePosts;


