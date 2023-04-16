import React from "react"
import { useState } from 'react'

export default function Post() {
    const [apartment, setApartment] = useState({
        name: "",
        description: "",
        imageUrl: "",
        userOwner: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setApartment({...apartment, [name]: value});
    };

    return (
        <div className="create-recipe">
            <h2>Create a Post</h2>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={handleChange}/>
                <label htmlFor="description" onChange={handleChange}>Description</label>
                <textarea name="description" onChange={handleChange} rows="5" cols="20" id="description" />
                <label for="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" onChange={handleChange} />
            </form>
           
        </div>
    )
}