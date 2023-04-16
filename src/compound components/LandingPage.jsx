import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import data from "../data"
import Card from "../components/Card"

export default function LandingPage() {

        const cards = data.map(item => {
          return (
            <Card
                key={item.id}
                item={item}
            />
          )
        })

    return (

        <div>
            <Hero />
            <h1 id="spotlight">Spotlight:</h1>
            <section className="card-list">
                {cards}
            </section> 
        </div>
    )
}