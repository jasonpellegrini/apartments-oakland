import React from "react"
import './card.css'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";

export default function Card(props) {
    const id = props.id;
    const userID = useGetUserID();

    //const [savedApartments, setSavedApartments] = React.useState([]);

    const saveApartment = async (id) => {
        try{
            const response = await axios.put("http://localhost:3001/apartments", {id, userID});
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="card">
            <img src={props.imgUrl} className="card--image" />
            <button onClick={() => saveApartment(id)} disabled={props.isSaved}>
                {props.isSaved ? "Saved" : "Save"}
            </button>
            <p className="cardText">{props.address}</p>
            <p className="cardText">{props.rating} / 5.0</p>
        </div>  
    )
}