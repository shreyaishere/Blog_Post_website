import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { HiOutlineSave } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

import "./PostDetail.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load Post!", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const showContactButton = !location.pathname.includes("/dashboard");

  return (
    <div>
      <div className="post-detail">
        <div className="author-bar">
          <h1>{post.title}</h1>

          <div className="left-bar">
            <div className="author-info">
              <img src="/avatar.png" alt="Author" />
              <div>
                <p className="author-name">
                  © {post.author?.name || "Anonymous"}
                </p>
                <span className="available-text">Available for work</span>
              </div>
            </div>
            <div className="like-share">
              <ul>
                <li>
                  <FcLike />
                </li>
                <li>
                  <HiOutlineSave />
                </li>
              </ul>
              {showContactButton && (
                <button
                  className="contact-btn"
                  onClick={() => setShowContactForm(true)}
                >
                  Get in Touch
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="main-image">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="description">
          <p>{post.content}</p>
          <p style={{ marginTop: "20px", fontWeight: 600 }}>
            © {post.author?.name || "Author"}
          </p>
        </div>

        <footer className="footer-bar">
          <div className="footer-content">
            <h3>{post.author?.name || "Author"}</h3>
            <p>Colors & shapes</p>
            {showContactButton && (
              <button
                className="contact-btn"
                onClick={() => setShowContactForm(true)}
              >
                Get in Touch
              </button>
            )}
          </div>
        </footer>
      </div>

      {showContactForm && (
        <div className="modal-backdrop">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-header">
              <h2>Contact Us</h2>
              <button
                type="button"
                className="form-close"
                onClick={() => setShowContactForm(false)}
              >
                ×
              </button>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="Phone number"
              placeholder="Your Phone Number"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
              <button className="send-msg" type="submit">
                Send Message
              </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
