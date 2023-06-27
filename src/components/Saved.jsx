import React from "react"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from "../components/Card"
import { useGetUserID } from "../hooks/useGetUserID";

export default function Saved() {
    const userID = useGetUserID();
    const [apartments, setApartments] = useState([]);
    const [savedApartments, setSavedApartments] = useState([]);
  
    useEffect(() => {
      const fetchApartment = async () => {
        try {
          const response = await axios.get("http://localhost:3001/apartments");
          setApartments(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      const fetchSavedApartment = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/apartments/savedApartments/ids/${userID}`,
            { userID }
          );
          setSavedApartments(response.data.savedApartments);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchApartment();
  
      if (userID) {
        fetchSavedApartment();
      }
    }, [userID]);
  
    const isApartmentSaved = (id) => savedApartments.includes(id);
  
    const cards = apartments.map((apartment) => {
      if (isApartmentSaved(apartment._id)) {
        return (
          <Card
            key={apartment._id}
            id={apartment._id}
            address={apartment.address}
            imgUrl={apartment.imageUrl}
            rating={apartment.rating}
            comments={apartment.comments}
            isSaved={isApartmentSaved(apartment._id)} // Use the isApartmentSaved function directly
          />
        );
      } else {
        console.log("no!");
        return null; // Return null when the apartment is not saved
      }
    });
  
    return (
      <div>
        <h1>Your Saved Apartments:</h1>
        <section className="card-list">{cards}</section>
      </div>
    );
  }