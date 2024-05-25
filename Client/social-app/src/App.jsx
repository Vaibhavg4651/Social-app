import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import SignUpPage from './Components/SignUpPage'

import './App.css'

function App() {

  return (
    <>
      <Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
    </>
  )
}

export default App
