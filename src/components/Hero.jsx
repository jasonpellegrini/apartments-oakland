import React from "react"
import './hero.css'
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div id="hero">
            <main role="main">
                <h1 id="heroText">Find out the facts for your next South Oakland apartment.</h1>
                <button id="heroButton">
                <Link className="text-black" to={"/browse"}>GET STARTED</Link>
                </button>
            </main>
        </div>
    )
}