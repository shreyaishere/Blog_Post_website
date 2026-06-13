import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, age: Number(form.age) };
      // await axios.post("http://localhost:5000/api/users/Register", payload, {
      await axios.post("https://blog-post-website-j5f0.onrender.com/api/users/Register", payload, {
        withCredentials: true,
      });

      alert("Registration successful");
      navigate("/Login");
    } catch (err) {
      alert(err.response?.data?.err || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="register-icon">✦</div>
        <h2>Create account</h2>

        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          placeholder="Your age"
          value={form.age}
          onChange={handleChange}
          required
          min="1"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <Link to="/Login" className="login-link">
            Log in
          </Link>
        </p>
      </form>

      <footer>
        <p>
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default Register;
