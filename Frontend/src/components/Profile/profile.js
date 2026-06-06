// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user profile
        const userRes = await axios.get('http://localhost:5000/api/users/:id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch posts by this user
        const postsRes = await axios.get('http://localhost:5000/api/posts/:id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(postsRes.data);

      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt="profile"
          className="profile-avatar"
        />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <h3>My Posts</h3>
      <div className="profile-posts">
        {posts.map(post => (
          <div className="profile-post-card" key={post._id}>
            <img src={post.image} alt={post.title} />
            <h4>{post.title}</h4>
            <p>{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
