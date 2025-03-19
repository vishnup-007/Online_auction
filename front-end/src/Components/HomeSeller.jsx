import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Core.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

const HomeSeller = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3006/auction')
      .then(response => {
        setAuctions(response.data.data.map(auction => ({
          ...auction,
          timeRemaining: getTimeRemaining(auction.auctiondate, auction.auctiontime)
        })));
      })
      .catch(error => {
        console.error("Error fetching auctions:", error);
      });

    // Update countdown every second and remove expired auctions
    const interval = setInterval(() => {
      setAuctions(prevAuctions =>
        prevAuctions
          .map(auction => ({
            ...auction,
            timeRemaining: getTimeRemaining(auction.auctiondate, auction.auctiontime)
          }))
          .filter(auction => auction.timeRemaining !== "Auction Ended") // Auto-delete expired auctions
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to calculate time remaining
  const getTimeRemaining = (date, time) => {
    const auctionEndTime = new Date(`${date}T${time}`).getTime();
    const now = new Date().getTime();
    const timeLeft = auctionEndTime - now;

    if (timeLeft <= 0) return "Auction Ended"; // Mark as ended

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  // Function to delete an auction
  const handleDelete = (auctionId) => {
    axios.delete(`http://localhost:3006/auction/${auctionId}`)
      .then(() => {
        setAuctions(prevAuctions => prevAuctions.filter(auction => auction._id !== auctionId));
      })
      .catch(error => {
        console.error("Error deleting auction:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Auction Items</h2>
      <div className="row">
        {auctions.length > 0 ? (
          auctions.map((auction, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img 
                  src={auction.image || "https://via.placeholder.com/200"} 
                  className="card-img-top" 
                  alt={auction.itemname || "Auction Item"} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.itemname}</h5>
                  <p className="card-text"><strong>Start Price:</strong> ${auction.startprice}</p>
                  <p className="card-text"><strong>Date:</strong> {auction.auctiondate}</p>
                  <p className="card-text"><strong>Time:</strong> {auction.auctiontime}</p>
                  <p className="card-text"><strong>Time Left:</strong> <span className="text-danger">{auction.timeRemaining}</span></p>
                  <button className="btn btn-danger" onClick={() => handleDelete(auction._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No auctions available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeSeller;
