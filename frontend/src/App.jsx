import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Login from '../authentication/login'
import SignUp from '../authentication/signup'
import ForgotPassword from '../authentication/forgotpassword'
import LandingPage from '../pages/landingpage'
import NavigationBar from '../components/navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <NavigationBar />
            <LandingPage />
          </>
        } />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<NavigationBar/>}/>
      </Routes>
    </>
  )
}

export default App
