import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const safeSearchTerm = searchTerm?.toLowerCase() || "";

  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/posts", {
      .get("https://blog-post-website-j5f0.onrender.com/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(safeSearchTerm)
  );

  const handleViewMore = () => setVisibleCount((prev) => prev + 8);
  const handleViewLess = () => setVisibleCount(8);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h2>Share your stories with the world.</h2>
        <p>
          Blogify is a place where ideas, experiences, and voices come alive.
          Read inspiring posts or publish your own.
        </p>
        {isLoggedIn ? (
          <button onClick={() => navigate("/dashboard")} className="btn-white">
            Start Posting
          </button>
        ) : (
          <button onClick={() => navigate("/Register")} className="btn-white">
            Join Blogify
          </button>
        )}
      </section>

      {/* POSTS */}
      <section className="posts">
        <h2>Latest Blog Posts</h2>
        <p className="subtitle">
          Explore trending topics and fresh perspectives:
        </p>

        <div className="posts-grid">
          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div
              className="card"
              key={post._id}
              onClick={() => navigate(`/${post._id}`)}
            >
              <div className="img-area">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="card-body">
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 100)}...</p>
                <span>by {post.author?.name || "Anonymous"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE / LESS BUTTONS */}
        <div className="view-more-container">
          {visibleCount < filteredPosts.length && (
            <button className="view-more-btn" onClick={handleViewMore}>
              View More
            </button>
          )}

          {visibleCount > 8 && (
            <button className="view-less-btn" onClick={handleViewLess}>
              View Less
            </button>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Blogify</h3>
          <p>
            Where ideas connect. Share your story, inspire others, and explore
            creativity without limits.
          </p>

          <div className="footer-socials">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="footer-links">
            <a href="/">About</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Contact</a>
          </div>

          <p className="copyright">
            © {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
