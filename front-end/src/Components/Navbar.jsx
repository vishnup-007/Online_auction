import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const Navigate =useNavigate();
  const handleClick =()=>{
    Navigate('/AuctionForm')
  }

  const handleHome =()=>{
    Navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top">
      <div className="container-xl">
        <a className="navbar-brand" >V-Auction</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link"  onClick={handleHome}>Home</a></li>
            <li className="nav-item"><a className="nav-link">My Auction</a></li>
            <li className="nav-item"><a className="nav-link"  onClick={handleClick}>Create Auction</a></li>
            <li className="nav-item"><a className="nav-link" >Accounts</a></li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="..." alt="User" className="rounded-circle" width="32" height="32"/>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
