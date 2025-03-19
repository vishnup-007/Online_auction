import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  
  const navigate = useNavigate(); // ✅ Fixed casing issue

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  // ✅ Update state when inputs change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3006/user", formData);
      console.log("Signup Successful:", response.data);
      navigate("/login"); // ✅ Redirect to login after signup
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            &#8592; Back
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate("/Signaut")}>
            Auctioner
          </button>
        </div>

        <h4 className="text-center mb-3">Signup</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"> Name </label>
            <input type="text" className="form-control" id="username" name="username" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"> Email </label>
            <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label"> Password </label>
            <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe"> Remember me </label>
          </div>

          <button type="submit" className="btn btn-primary w-100"> Signup </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
