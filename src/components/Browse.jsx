import React from "react"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './browse.css'
import axios from 'axios';

export default function Browse() {

    const getCoordinates = async () => {
        const address = "3720 Dawson Street"

        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${address}&limit=2&format=json`;
            const response = await axios.get(url);
            console.log("response:", response);
        } catch {
            console.log("error")
        }
    }
    


    return (
        <div>
            <button onClick={getCoordinates}>Button</button>
        
            <MapContainer center={[40.431988,-79.959838]} zoom={15}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}