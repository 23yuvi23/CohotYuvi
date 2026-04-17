import React, { useRef } from 'react'

const App = () => {
  const inputRef = useRef();
  

  return (
    <div>
      SignUp
      <input ref={inputRef} id='name' type={"text"}/>
      <input type={"text"}/>
      <button onClick={focusOnInput}> Submit </button>
    </div>
  )

  function focusOnInput () {
  // document.getElementById("name").focus()

  //  another way to fetch Dom element with References
  inputRef.current.focus()
  
}

}



export default App