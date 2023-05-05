import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import data from "../data"
import Card from "../components/Card"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";

export default function LandingPage() {
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
            fetchSavedApartment();

        }, []);

        const cards = apartments.map((apartment) => {
          return (
            <Card
                key={apartment._id}
                id={apartment._id}
                address={apartment.address}
                imgUrl={apartment.imageUrl}
                rating={apartment.rating}
            />
          )
        })

    return (

        <div>
            <Hero />
            <h1 id="spotlight">Spotlight:</h1>
            <section className="card-list">
                {cards}
            </section> 
        </div>
    )
}