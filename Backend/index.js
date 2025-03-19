const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const sellerModel = require('./Models/SellerModels');
const userModel = require('./Models/UserModels');
const auctionModel = require('./Models/AuctionModels'); 
const bidModel = require('./Models/BidModels'); 
const bidsModel = require('./Models/BiddsModels'); // ✅ Import Bids model

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/sellerDB")
    .then(() => console.log("✅ MongoDB connected to 'sellerDB' database"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Seller Routes
app.post('/seller', async (req, res) => {
    try {
        const newSeller = new sellerModel(req.body);
        await newSeller.save();
        res.status(201).json({ success: true, data: newSeller });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/seller', async (req, res) => {
    try {
        const sellers = await sellerModel.find({});
        res.status(200).json({ success: true, data: sellers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ User Routes
app.post('/user', async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/user', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Auction Routes
app.post('/auction', async (req, res) => {
    try {
        const newAuction = new auctionModel(req.body);
        await newAuction.save();
        res.status(201).json({ success: true, data: newAuction });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/auction', async (req, res) => {
    try {
        const auctions = await auctionModel.find({});
        res.status(200).json({ success: true, data: auctions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.delete('/auction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuction = await auctionModel.findByIdAndDelete(id);
        if (!deletedAuction) {
            return res.status(404).json({ success: false, message: "Auction not found" });
        }
        res.status(200).json({ success: true, message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Bid Routes
app.post('/bid', async (req, res) => {
    try {
        const newBid = new bidModel(req.body);
        await newBid.save();
        res.status(201).json({ success: true, data: newBid });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/bid', async (req, res) => {
    try {
        const bids = await bidModel.find({});
        res.status(200).json({ success: true, data: bids });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ New Bids Routes (For `Bids` model)
app.post('/bids', async (req, res) => {
    try {
        console.log("📩 Received Bids Data:", req.body);
        const newBids = new bidsModel(req.body);
        await newBids.save();
        res.status(201).json({ success: true, data: newBids });
    } catch (err) {
        console.error("❌ Error creating new bids:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/bids', async (req, res) => {
    try {
        const bids = await bidsModel.find({});
        res.status(200).json({ success: true, data: bids });
    } catch (error) {
        console.error("❌ Error fetching bids:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Test Route
app.get('/', (req, res) => {
    res.send("🎉 Hello World, API is running!");
});

// ✅ Start Server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
