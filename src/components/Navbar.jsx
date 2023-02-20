import React from "react"
import './navbar.css'

export default function Navbar() {
    return (
        <nav>
            <span id="navLeft">
                <img id="logo" src="./src/assets/flats.png" height="40px" width="40px"/>
                <h1 id="titleFirstHalf">apartments</h1><h1 id="titleSecondHalf">oakland</h1>
            </span>     
            <span id="navRight">
                <h2>Search</h2>
                <h2>Explore</h2>
                <h2>Post</h2>
            </span>
        </nav>
    )
}