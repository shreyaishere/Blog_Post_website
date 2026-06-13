import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaHome, FaSearch, FaUserCircle, FaCog, FaSignOutAlt, FaFolderOpen } from "react-icons/fa";
import "./../App.css";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showSearch = location.pathname === "/" || location.pathname === "/dashboard";
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!isLoggedIn) return;
    setShowDropdown(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowDropdown(false);
    setUser(null);
    navigate("/Login");
  };

  const handleOptionClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const t = localStorage.getItem("token");
        if (!t) return;
        // const res = await axios.get("http://localhost:5000/api/auth/me", {
        const res = await axios.get("https://blog-post-website-j5f0.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${t}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // if unauthorized, clear token
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
        }
      }
    };

    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // compute initials fallback
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    return (parts[0][0] || "") + (parts[1]?.[0] || "");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo"><Link to="/">Blogify</Link></h2>

        {isLoggedIn && showSearch && (
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search posts..."
              className="search-input"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        )}
      </div>

      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link className="nav-link" to="/Login">Login</Link>
            <Link className="nav-link" to="/Register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/" className="icon-link" title="Home"><FaHome /></Link>

            {/* Profile Section */}
            <div className="profile-section" ref={dropdownRef}>
              <button
                className="profile-button"
                onClick={toggleDropdown}
                aria-expanded={showDropdown}
                aria-haspopup="true"
                type="button"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name || "avatar"} className="profile-avatar-icon" />
                ) : (
                  <div className="avatar-initials">{getInitials(user?.name || "") || <FaUserCircle />}</div>
                )}
              </button>

              {showDropdown && (
                <div className="profile-dropdown advanced">
                  <div className="profile-card">
                    <div className="profile-thumb">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="avatar" />
                      ) : (
                        <div className="thumb-initials">{getInitials(user?.name || "") || "GU"}</div>
                      )}
                    </div>
                    <div className="profile-meta">
                      <div className="profile-name">{user?.name || "Guest User"}</div>
                      <div className="profile-email">{user?.email || ""}</div>
                    </div>
                  </div>

                  <div className="dropdown-items">
                    <button className="dropdown-item" onClick={() => handleOptionClick("/dashboard")}>
                      <FaUserCircle className="item-icon" /> Profile
                    </button>

                    <button className="dropdown-item" onClick={() => handleOptionClick("/projects")}>
                      <FaFolderOpen className="item-icon" /> Project Briefs
                    </button>

                    <button className="dropdown-item" onClick={() => handleOptionClick("/settings")}>
                      <FaCog className="item-icon" /> Settings
                    </button>
                  </div>

                  <div className="dropdown-footer">
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <FaSignOutAlt className="item-icon" /> Sign out
                    </button>
                  </div>

                  {/* small arrow pointer */}
                  <span className="dropdown-arrow" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
