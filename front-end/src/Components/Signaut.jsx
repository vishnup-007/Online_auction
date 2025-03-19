import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signaut = () => {
  const navigate = useNavigate();

  const [ownername, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3006/seller', {
        ownername,
        email,
        phonenumber,
        password
      });

      console.log("Response Data:", response.data);
      alert("Signup Successful!");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            &#8592; Back
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
            Home
          </button>
        </div>

        <h4 className="text-center mb-3">Seller Signup</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="ownerName" className="form-label">Owner Name</label>
            <input type="text" className="form-control" id="ownerName" required onChange={(e) => setOwnerName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone" required onChange={(e) => setPhonenumber(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label" htmlFor="terms">
              Agree to Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Signup as Seller</button>
        </form>

        <p className="text-center mt-3">
          Want to register as a buyer?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
            Click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signaut;
