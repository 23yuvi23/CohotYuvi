import React, { useState } from 'react'

const App = () => {
  const [bulbOn, setBulbOn] = useState(true)
  return (
    <div>
     < Light bulbOn={bulbOn} setBulbOn={setBulbOn}/>
    </div>
  )

  function Light ({bulbOn,setBulbOn}) {
    // bulbOn is a prop to the Bulb State component
    // bulbOn , setBulbOn are props to the ToggleBulbState component

    return <div>
      <LightBulb bulbOn={bulbOn}/>
      <LightSwitch bulbOn={bulbOn} setBulbOn={setBulbOn}/>
    </div>
  }

  function LightBulb ({bulbOn}){
    return <div>
      {bulbOn ? "Bulb on" : "Bulb off"}
    </div>
  }

  function LightSwitch ({bulbOn,setBulbOn}) {

    function toggle() {
      setBulbOn(!bulbOn)
    }

    return <div>
      <button onClick={toggle}>Toggle the bulb</button>
    </div>
  }
}

export default App