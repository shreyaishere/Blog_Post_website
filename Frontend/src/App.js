import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Home from "./Pages/Home.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import CreatePost from "./components/Dashboard/CreatePost.js";
import PostDetails from "./components/PostDetail.js";
import Settings from "./Pages/Settings.js";
// import Profile from "./components/Profile/profile.js";
import "./App.css";


const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const hideNavbar =
    location.pathname === "/Login" || location.pathname === "/Register";

  return (
    <>
      {!hideNavbar && (
        <Navbar isLoggedIn={isLoggedIn} onSearch={setSearchTerm} />
      )}
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route
          path="/Login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/:id" element={<PostDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
