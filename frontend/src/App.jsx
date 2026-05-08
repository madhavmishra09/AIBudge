import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from '../authentication/login'
import SignUp from '../authentication/signup'
import ForgotPassword from '../authentication/forgotpassword'
import LandingPage from '../pages/landingpage'
import NavigationBar from '../components/navbar'
function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App
