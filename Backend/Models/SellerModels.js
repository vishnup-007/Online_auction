const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    ownername: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true }, // ✅ Fixed typo
    password: { type: String, required: true }
}, { timestamps: true });

const sellerModel = mongoose.model('Seller', sellerSchema); // ✅ Capitalized model name

module.exports = sellerModel;
