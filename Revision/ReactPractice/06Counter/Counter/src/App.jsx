import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0)
  // let counter = 15
  const addvalue = ()=>{
    setCounter(counter + 1)
  }
  const removeValue = ()=>{
    setCounter(counter - 1)
  }
  return (
    <>
    <h1>React cource {counter} </h1>
    <h2>Counter value: {counter}</h2>
    <button
    onClick={addvalue}
    >Add value</button> {" "}
    <button
    onClick={removeValue}
    >emove value</button>
    <p>Footer:{counter}</p>
    </>
  )
}

export default App
