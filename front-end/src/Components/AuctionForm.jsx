import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './Core.css';

const AuctionForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage("");

        try {
            let base64Image = "";
            if (data.image[0]) {
                base64Image = await convertToBase64(data.image[0]);
            }

            const auctionData = {
                image: base64Image,
                itemname: data.itemName,
                startprice: parseFloat(data.startPrice),
                auctiondate: data.date,
                auctiontime: data.time
            };

            const response = await axios.post("http://localhost:3006/auction", auctionData);

            if (response.status === 201) {
                setMessage("Auction created successfully!");
            }
        } catch (error) {
            setMessage("Failed to create auction.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 form">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Create Auction Item</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" {...register("image", { required: true })} className="form-control mb-3" />
                    <input type="text" {...register("itemName", { required: true })} className="form-control mb-3" placeholder="Item Name" />
                    <input type="number" {...register("startPrice", { required: true, min: 1 })} className="form-control mb-3" placeholder="Start Price" />
                    <input type="date" {...register("date", { required: true })} className="form-control mb-3" />
                    <input type="time" {...register("time", { required: true })} className="form-control mb-3" />
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuctionForm;
