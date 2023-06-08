import React from "react"
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import { useLocation } from "react-router-dom";

export default function View(props) {
    const userID = useGetUserID();
    const location = useLocation();
    const { id, address ,imgUrl, rating, isSaved: initial } = location.state;

    //const [savedApartments, setSavedApartments] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(initial);

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
            <img src={location.state.imgUrl} className="card--image" />
            <button onClick={() => saveApartment(id)} disabled={isSaved}>
                {isSaved ? "Saved" : "Save"}
            </button>
            <p className="cardText">{location.state.address}</p>
            <p className="cardText">{location.state.rating} / 5.0</p>
        </div>  
    )
}