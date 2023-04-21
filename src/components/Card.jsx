import React from "react"
import './card.css'

export default function Card(props) {
    return(
        <div className="card">
            <img src={props.imgUrl} className="card--image" />
            <p className="cardText">{props.address}</p>
            <p className="cardText">{props.rating} / 5.0</p>
        </div>  
    )
}