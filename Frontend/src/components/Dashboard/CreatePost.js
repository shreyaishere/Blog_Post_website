import React, { useState } from "react";
import axios from "axios";
// import './../../App.css'
import './Dashboard.css'


function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    content: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // await axios.post("http://localhost:5000/api/posts", form, {
      await axios.post("https://blog-post-website-j5f0.onrender.com/api/posts", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post Created!");
      setForm({ title: "", image: "", content: "" });
    } catch (err) {
      console.error("Error creating post: ", err);
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create a New Post </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          rows="5"
          value={form.content}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;



 