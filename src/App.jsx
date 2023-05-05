import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import data from './data'
import Card from './components/Card'
import Login from './components/Login'
import LandingPage from './compound components/LandingPage'
import Saved from './components/Saved'
import Browse from './components/Browse'
import Post from './components/Post'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/saved" element={<Saved />} />
        <Route exact path="/browse" element={<Browse />} />
        <Route exact path="/post" element={<Post />} />
      </Routes> 
  </div>
  )
} 

/*
  <div className="App">
      <Login />
      <LandingPage />
      <Search />
      <Browse />
      <Post />
    </div>
*/

export default App

