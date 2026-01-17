import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   {/* <h1 className='text-3xl bg-green-500 p-3 rounded-4xl'>vite with tailwind</h1> */}
   <Card username="yuvi"/>
   <Card username="mannu"/>
   <Card username="aman"/>
   </>
  )
}

export default App
