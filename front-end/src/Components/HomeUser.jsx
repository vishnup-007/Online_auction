import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Core.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from 'react-bootstrap';

const HomeUser = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [allBids, setAllBids] = useState([]);
  const [highestBids, setHighestBids] = useState({}); // Stores highest bid per item

  // Fetch auctions
  const fetchAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:3006/auction');
      setAuctions(response.data.data.map(auction => ({
        ...auction,
        timeRemaining: getTimeRemaining(auction.auctiondate, auction.auctiontime),
      })));
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  // Fetch bids and update highest bid state
  const fetchAllBids = async () => {
    try {
      const response = await axios.get('http://localhost:3006/bid');
      const bids = response.data.data;
      setAllBids(bids);

      // Calculate highest bid per item
      const updatedHighestBids = {};
      auctions.forEach(auction => {
        const auctionBids = bids.filter(bid => bid.itemname === auction.itemname).map(bid => bid.bidAmount);
        updatedHighestBids[auction.itemname] = auctionBids.length > 0 ? Math.max(...auctionBids) : auction.startprice;
      });

      setHighestBids(updatedHighestBids);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  // Fetch data on component mount & refresh every second
  useEffect(() => {
    fetchAuctions();
    fetchAllBids();
    const interval = setInterval(() => {
      fetchAuctions();
      fetchAllBids();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining
  const getTimeRemaining = (date, time) => {
    const auctionEndTime = new Date(`${date}T${time}`).getTime();
    const now = new Date().getTime();
    const timeLeft = auctionEndTime - now;
    if (timeLeft <= 0) return "Auction Ended";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  // Open bid modal
  const handleBidClick = (auction) => {
    setSelectedAuction(auction);
    setBidAmount(highestBids[auction.itemname] + 1 || auction.startprice + 1);
    setShowModal(true);
  };

  // Submit a new bid
  const handleSubmitBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= highestBids[selectedAuction.itemname]) {
      alert("Enter a valid bid amount higher than the current highest bid.");
      return;
    }

    const bidData = {
      auctionId: selectedAuction._id,
      bidAmount: parseFloat(bidAmount),
      itemname: selectedAuction.itemname,
      bidderName: "Anonymous"
    };

    try {
      console.log("Sending bid data:", bidData);
      
      const response = await axios.post('http://localhost:3006/bid', bidData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        alert("Bid placed successfully!");
        await fetchAllBids();  // Refresh new bid state
        setShowModal(false);
      } else {
        alert(response.data.message || "Failed to place bid.");
      }
    } catch (error) {
      console.error("Error placing bid:", error.response?.data || error.message);
      alert(`Failed to place bid: ${error.response?.data?.message || error.message}`);
    }
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
                  <p className="card-text"><strong>Highest Bid:</strong> ${highestBids[auction.itemname] || auction.startprice}</p>
                  <p className="card-text"><strong>Date:</strong> {auction.auctiondate}</p>
                  <p className="card-text"><strong>Time:</strong> {auction.auctiontime}</p>
                  <p className="card-text"><strong>Time Left:</strong> <span className="text-danger">{auction.timeRemaining}</span></p>
                  <button className="btn btn-primary" onClick={() => handleBidClick(auction)}>Bid Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No auctions available.</p>
        )}
      </div>

      {/* Bid Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Place Your Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAuction && (
            <>
            <h5>{selectedAuction.itemname}</h5>
          <p><strong>Starting Price:</strong> ${selectedAuction.startprice}</p>
          {allBids
            .filter((allBids) => allBids.itemname === selectedAuction.itemname)
            .sort((a, b) => b.bidAmount - a.bidAmount) // Sort bids in descending order
            .slice(0, 1) // Take only the highest bid
            .map((r, i) => (
              <p key={i}><strong>Highest Bid:</strong> ${r.bidAmount}</p>
          ))}

            </>
          )}
          <Form.Group>
            <Form.Label>Enter Your Bid Amount:</Form.Label>
            <Form.Control 
              type="number" 
              value={bidAmount} 
              onChange={(e) => setBidAmount(e.target.value)} 
              min={highestBids[selectedAuction?.itemname] + 1 || selectedAuction?.startprice + 1}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitBid}>Submit Bid</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomeUser;
