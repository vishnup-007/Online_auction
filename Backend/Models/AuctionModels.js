const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    image: { type: String, required: true },
    itemname: { type: String, required: true }, // ✅ Fixed typo (itemname)
    startprice: { type: String, required: true },
    auctiondate: { type: String, required: true },
    auctiontime: { type: String, required: true },
    bidId:{ type: mongoose.Schema.Types.ObjectId, ref: 'BidModel' } 
}, { timestamps: true });

const auctionModel = mongoose.model('Auction', auctionSchema); // ✅ Correct model name

module.exports = auctionModel;
