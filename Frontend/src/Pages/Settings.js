// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Settings.css"; // Import the CSS file

// const Settings = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="settings-container">
//       {/* Sidebar */}
//       <div className="settings-sidebar">
//         <h2 className="sidebar-title">{user?.name || "Profile"}</h2>
//         <ul className="settings-menu">
//           <li className="active">General</li>
//           <li>Edit Profile</li>
//           <li>Password</li>
//           <li>Social Profiles</li>
//           <li>Company</li>
//           <li>Payouts</li>
//           <li>Email Notifications</li>
//           <li>Billing</li>
//           <li>Sessions</li>
//           <li>Applications</li>
//           <li>Data Export</li>
//           <li className="delete">Delete Account</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="settings-main">
//         <h2 className="main-title">General</h2>

//         {/* Username */}
//         <div className="form-group">
//           <label>Username</label>
//           <input
//             type="text"
//             defaultValue={user?.username || "your-username"}
//           />
//           <p className="help-text">
//             Your profile URL:{" "}
//             <a href={`https://myblog.com/${user?.username || "username"}`}>
//               myblog.com/{user?.username || "username"}
//             </a>
//           </p>
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label>Account Email</label>
//           <input
//             type="email"
//             defaultValue={user?.email || "example@email.com"}
//           />
//         </div>

//         {/* Google Sign-In */}
//         <div className="form-group">
//           <label>Google Sign-In</label>
//           <button className="google-btn">Connect with Google</button>
//         </div>

//         {/* Save Button */}
//         <div className="form-actions">
//           <button className="save-btn">Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="settings-sidebar">
        <h2>{user?.name || "Profile"}</h2>
        <ul>
          <li className="active">General</li>
          <li>Edit Profile</li>
          <li>Password</li>
          <li>Social Profiles</li>
          <li>Company</li>
          <li>Payouts</li>
          <li>Email Notifications</li>
          <li>Billing</li>
          <li>Sessions</li>
          <li>Applications</li>
          <li>Data Export</li>
          <li className="delete">Delete Account</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="settings-main">
        <h2>General</h2>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            defaultValue={user?.username || "your-username"}
          />
          <p className="hint">
            Your profile URL:{" "}
            <a href={`https://myblog.com/${user?.username || "username"}`}>
              myblog.com/{user?.username || "username"}
            </a>
          </p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Account Email</label>
          <input
            type="email"
            defaultValue={user?.email || "example@email.com"}
          />
        </div>

        {/* Google Sign-In */}
        <div className="form-group">
          <label>Google Sign-In</label>
          <button className="google-btn">Connect with Google</button>
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
