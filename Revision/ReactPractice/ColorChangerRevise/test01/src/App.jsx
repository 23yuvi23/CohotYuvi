import { useState } from 'react'
import './App.css'
import Color from './colors'
function App() {
  const [color, setColor] = useState('purple')

const bgColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
}


  return (
  <div className={`min-h-screen ${bgColors[color]} duration-300`}>
    <Color setColor={setColor} />
  </div>
  )
}

export default App
