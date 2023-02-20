import React from "react"
import './card.css'

export default function Card(props) {
    return(
        <div className="card">
            <img src={`../src/assets/${props.item.coverImg}`} className="card--image" />
            <p className="cardText">{props.item.title}</p>
            <p className="cardText">{props.item.rating} / 5.0</p>
        </div>  
    )
}