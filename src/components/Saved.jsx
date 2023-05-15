import React from "react"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from "../components/Card"
import { useGetUserID } from "../hooks/useGetUserID";

export default function Saved() {
    const userID = useGetUserID();

    const [apartments, setApartments] = React.useState([]);
    const [savedApartments, setSavedApartments] = React.useState([]);

    useEffect(() => {
        const fetchApartment = async () => {
            try{
                const response = await axios.get("http://localhost:3001/apartments");
                setApartments(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedApartment = async () => {
            try{
                const response = await axios.get(
                    `http://localhost:3001/apartments//savedApartments/ids/${userID}`,
                    { userID }
                );
                setSavedApartments(response.data.savedApartments);
                console.log("data",response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApartment();
        
        if (userID) {
            fetchSavedApartment();
        }

    }, []);

        const isApartmentSaved = (id) => savedApartments.includes(id);

        const cards = savedApartments.map((apartment) => {
          return (
            <Card
                key={apartment._id}
                id={apartment._id}
                address={apartment.address}
                imgUrl={apartment.imageUrl}
                rating={apartment.rating}
                isSaved={userID ? isApartmentSaved(apartment._id) : false}
            />
          )
        });

    return (
        <div>
            <h1>Your Saved Recipes:</h1>
            <section className="card-list">
                {cards}
            </section>  
        </div>
    )
}