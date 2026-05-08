import { useState } from 'react'
import './App.css'
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
      </Routes>
    </>
  )
}

export default App
