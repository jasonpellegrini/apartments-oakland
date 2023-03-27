import React from "react"
import './navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <span id="navLeft">
                <img id="logo" src="./src/assets/flats.png" height="40px" width="40px"/>
                <h1 id="titleFirstHalf">apartments</h1><h1 id="titleSecondHalf">oakland</h1>
            </span>     
            <span id="navRight">
                <h2 className="navButtons">
                    <Link className="text-white" to={"/search"}>Search</Link>
                </h2>
                <h2 className="navButtons">
                    <Link className="text-white" to={"/browse"}>Browse</Link>
                </h2>
                <h2 className="navButtons">
                    <Link className="text-white" to={"/post"}>Post</Link>
                </h2>
            </span>
        </nav>
    )
}