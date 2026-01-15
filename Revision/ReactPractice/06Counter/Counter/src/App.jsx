import { useState } from 'react'
import './App.css'

function App() {
  let counter = 15
  const addvalue = ()=>{
    counter = counter+1
    console.log(counter);
    
  }
  return (
    <>
    <h1>React cource {counter} </h1>
    <h2>Counter value: {counter}</h2>
    <button
    onClick={addvalue}
    >Add value</button> {" "}
    <button>remove value</button>
    <p>Footer:{counter}</p>
    </>
  )
}

export default App
