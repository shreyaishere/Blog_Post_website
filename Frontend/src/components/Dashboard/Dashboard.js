import React, { useEffect } from "react";
// import './../../App.css';
import "./Dashboard.css";
import { FaFileAlt, FaPlus, FaTools } from "react-icons/fa";
import CreatePost from "./CreatePost";
import AllPosts from "./AllPosts";
import ManagePosts from "./ManagePosts";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not authenticated");

      const res = await axios.get("http://localhost:5000/api/posts/myposts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPosts(res.data);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllPosts posts={posts} />;
      case "create":
        return <CreatePost fetchPosts={fetchPosts} />;
      case "manage":
        return <ManagePosts posts={posts} onDelete={handleDelete} />;
      default:
        return <AllPosts posts={posts} />;
    }
  };
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-list">
          <li
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "active" : ""}
          >
            <FaFileAlt />
            All Posts
          </li>
          <li
            onClick={() => setActiveTab("create")}
            className={activeTab === "create" ? "active" : ""}
          >
            <FaPlus />
            Create Post
          </li>
          <li
            onClick={() => setActiveTab("manage")}
            className={activeTab === "manage" ? "active" : ""}
          >
            <FaTools />
            Manage Posts
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
