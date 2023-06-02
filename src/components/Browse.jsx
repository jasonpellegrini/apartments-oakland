import React from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './browse.css'

export default function Browse() {
    return (
        <MapContainer center={[40.431988,-79.959838]} zoom={13}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}