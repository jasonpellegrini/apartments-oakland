import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import data from "../data"
import Card from "../components/Card"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function LandingPage() {

        const [apartments, setApartments] = React.useState([]);

        useEffect(() => {
            const fetchApartment = async () => {
                try{
                    const response = await axios.get("http://localhost:3001/apartments");
                    setApartments(response.data);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchApartment();

        }, []);

        const cards = apartments.map((apartment) => {
          return (
            <Card
                key={apartment._id}
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