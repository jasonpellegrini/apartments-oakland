import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export default function Post() {
    const userID = useGetUserID();

    const [apartment, setApartment] = useState({
        address: "",
        description: "",
        imageUrl: "",
        rating: 0,
        userOwner: userID,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setApartment({...apartment, [name]: value});
    };

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/apartments", apartment);
            alert("post created");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create a Post</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                />
                <label htmlFor="description" onChange={handleChange}>Description</label>
                <textarea
                    name="description"
                    onChange={handleChange}
                    rows="5" cols="20"
                    id="description"
                />
                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    onChange={handleChange}
                />
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
           
        </div>
    )
}