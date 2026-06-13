import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      // .post("http://localhost:5000/api/users/Login", form, {
      .post("https://blog-post-website-j5f0.onrender.com/api/users/Login", form, {
        withCredentials: true,
      })
      .then((res) => {
        const role = res.data.role;
        console.log(role);
        if (res.status === 200) {
          alert("Login successful");
          localStorage.setItem("token", res.data.token);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          alert("Login Failed");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed");
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="login-icon">⟡</div>
        <h2>Sign in</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          onChange={handleChange}
          required
        />
        <button type="submit">Continue</button>
        <p>
          Don’t have an account?{" "}
          <Link to="/Register" className="signup-link">
            Register
          </Link>
        </p>
      </form>

      <footer>
        {/* <p>
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p> */}
        <p>
    <span>Terms of Service</span> and{" "}
    <span>Privacy Policy</span>
  </p>
      </footer>
    </div>
  );
};

export default Login;
