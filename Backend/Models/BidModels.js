const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSchema = new Schema({
    bidAmount: { type: Number, required: true },
    
   
}, { timestamps: true });

const bidModel = mongoose.model('Bid', BidSchema); // ✅ Capitalized model name

module.exports = bidModel;
