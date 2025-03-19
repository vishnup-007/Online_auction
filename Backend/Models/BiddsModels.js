const mongoose = require('mongoose');

const BidsSchema = new mongoose.Schema({
  auctionId: {
    type: String,
    
    required: true
  },
  itemname: {
    type: String,
    required: true
  },
  bidderName: {
    type: String,
    default: 'Anonymous'
  },
  bidAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Bids = mongoose.model('Bids', BidsSchema);
module.exports = Bids;
