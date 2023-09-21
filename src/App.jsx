import { useState } from 'react'
import './App.css'
import Pomodoro from './components/Pomodoro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pomodoro/>
    </>
  )
}

export default App
