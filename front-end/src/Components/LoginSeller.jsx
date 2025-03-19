import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSeller = () => {
  const [users, setUsers] = useState([]);  // Store fetched seller data
  const [email, setEmail] = useState("");  // Store input email
  const [password, setPassword] = useState("");  // Store input password
  const [error, setError] = useState("");  // Error message

  const navigate = useNavigate();

  // Fetch seller data from the database
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3006/seller"); // Fetch from correct endpoint
      setUsers(response.data.data); // Ensure correct data structure
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  // Handle login validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user exists with matching email and password
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      navigate("/Homeseller");  // Navigate to seller home page
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Seller Login</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Homeseller")}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSeller;
