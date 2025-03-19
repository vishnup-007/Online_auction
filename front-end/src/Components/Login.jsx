import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState([]);  // Store fetched user data
  const [email, setEmail] = useState("");  // Store input email
  const [password, setPassword] = useState("");  // Store input password
  const [error, setError] = useState("");  // Error message

  const navigate = useNavigate();

  // Fetch user data from the backend
  const fetchUsers = () => {
    axios
      .get("http://localhost:3006/user")
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  // Handle login validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user exists with matching email and password
    const matchedUser = user.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      navigate("/HomeUser");  // Navigate to user home page
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }}>
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
