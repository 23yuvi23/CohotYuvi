import React, { useRef, useState } from 'react'

const App = () => {
  const[currentCount, setCurrentCount] = useState(0);
  const timer = useRef();

  function StartClock () {
    // start interval 
   
    const value = setInterval (()=>{
      setCurrentCount(c=>c+1)
    },1000)
    timer.current = value
  } 
  // 
  function StopClock () {
    clearInterval(timer.current) // stop the clock at current state 
    timer.current = null; // reset so we can start again
  }

  function ResetClock() {
  clearInterval(timer.current);   // stop interval
  // timer.current = null;           // reset ref
  setCurrentCount(0);             // reset value to 0
}

  return (
    <div>
      {currentCount}
      <br />
      <button onClick={StartClock}> Start </button>
      <button onClick={StopClock} > Stop </button>
      <button onClick={ResetClock} > Reset </button>
    </div>
  )
}

export default App