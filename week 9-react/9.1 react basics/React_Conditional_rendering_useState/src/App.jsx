import { useState } from "react";

const ToggleMessage = ()=>{
  const [toggle,setToggle] = useState(false)

  return (
    <div>
    <button onClick={() => setToggle(!toggle)}>
  {toggle ? "Hide" : "Show"}
</button>

      {toggle && <p>this message was conditionally rendered</p>}
    </div>
  )
}

function App(){
  return(
    <div>
      <ToggleMessage />
    </div>
  )
}

export default App

