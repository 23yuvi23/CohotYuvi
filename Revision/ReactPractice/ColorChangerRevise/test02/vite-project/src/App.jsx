import { useState } from 'react'
import Color from './Color'

function App() {
  const [color, setColor] = useState('green')
const  bgColor = {
    red:"bg-red-500",
    blue:"bg-blue-500",
    green:"bg-green-500"
}

  return (
   <div className={`min-h-screen ${bgColor[color]} delay-300`}>
      <Color setColor={setColor}/>
   </div>
  )
}

export default App
