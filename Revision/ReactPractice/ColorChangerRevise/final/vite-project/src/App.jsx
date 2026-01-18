import { useState } from 'react'
import Color from './Color'

const bgColor = {
    red : "bg-red-500",
    blue: 'bg-blue-500'
}

function App() {
  const [color, setColor] = useState('blue')

  return (
   <div>
    <div className= {`min-h-screen ${bgColor[color]}`} >
      <Color setColor={(setColor)}/>
    </div>

   </div>
  )
}

export default App
