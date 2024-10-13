import { useState } from 'react'
import './App.css'
import JokeGenerator from './JokeGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JokeGenerator/>
    </>
  )
}

export default App
