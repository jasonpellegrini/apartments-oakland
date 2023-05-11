import React from "react"
import './card.css'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";

export default function Card(props) {
    const id = props.id;
    const userID = useGetUserID();

    //const [savedApartments, setSavedApartments] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(props.isSaved);

    const saveApartment = async (id) => {
        console.log(id)
        try{
            if (userID) {
                const response = await axios.put("http://localhost:3001/apartments", {id, userID});
                console.log(response);
                setIsSaved(true);
                console.log("is saved", isSaved);
            } else {
                alert("Please log in to save!")
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="card">
            <img src={props.imgUrl} className="card--image" />
            <button onClick={() => saveApartment(id)} disabled={isSaved}>
                {isSaved ? "Saved" : "Save"}
            </button>
            <p className="cardText">{props.address}</p>
            <p className="cardText">{props.rating} / 5.0</p>
        </div>  
    )
}