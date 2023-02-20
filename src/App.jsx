import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import data from './data'
import Card from './components/Card'

function App() {
  const cards = data.map(item => {
    return (
      <Card
          key={item.id}
          item={item}
      />
    )
  })

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <h1 id="spotlight">Spotlight:</h1>
      <section className="card-list">
        {cards}
      </section>
    </div>
  )
}

export default App

