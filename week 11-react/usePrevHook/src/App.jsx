import React from 'react'
import { useState } from 'react'
import { usePrev } from './hooks/usePrev';



const App = () => {

  const [state,setState] = useState(0);
  const prev = usePrev(state);

  return (
    <div>
      <p>{state}</p>
      <button onClick={()=>{
        setState((curr)=> curr + 1)
      }}>
        Click me 
      </button>
      <p>the prev value was {prev} </p>
    </div>
  )
}

export default App