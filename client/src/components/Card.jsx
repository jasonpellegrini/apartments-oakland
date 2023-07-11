import React from "react"
import './card.css'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const id = props.id;
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [isSaved, setIsSaved] = React.useState(props.isSaved);

    const saveApartment = async (id) => {
        try{
            if (userID) {
                const response = await axios.put("http://localhost:3001/apartments", {id, userID});
                setIsSaved(true);
            } else {
                alert("Please log in to save!")
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    const handleClick = () => {
        navigate("/view", {
            state: {
                ...props,
                isSaved: isSaved
            }
        });
    }

    return(
        <div className="card">
            <img src={props.imgUrl} onClick={handleClick} className="card--image" />
            <button onClick={() => saveApartment(id)} disabled={isSaved}>
                {isSaved ? "Saved" : "Save"}
            </button>
            <p className="cardText">{props.address}</p>
            <p className="cardText">{props.rating} / 5.0</p>
        </div>  
    )
}