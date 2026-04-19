import React, { useEffect, useRef } from 'react'

function useDebounce(originalFn) {
  const currentClock = useRef();

const fn = () =>{
  clearTimeout(currentClock.current); //clear old clock 
  currentClock.current = setTimeout(originalFn,300)  //start new clock
}
  return fn
}

const App = () => {
function sendDataToBackend () {
  fetch("api.amazon.com")
}

const debouncedFn = useDebounce(sendDataToBackend)

  return (
    <div>
      <input type="text" name="" id="" onChange={debouncedFn} />
      
    </div>
  )
}

export default App