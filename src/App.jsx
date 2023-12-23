import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className='custom-container' style={{marginBottom:'200px'}}>
        <NavBar/>
        <Footer/>
      </div>
    </>
  )
}

export default App
