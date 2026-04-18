import React, { createContext, useContext, useState } from 'react'

// context is always stored outside  App or in seperate file 
const BulbContext = createContext();



const App = () => {
  const [bulbOn, setBulbOn] = useState(true)

  return (
    <div>
      <BulbContext.Provider value = {{
        bulbOn : bulbOn,
        setBulbOn : setBulbOn
      }}>
        < Light/>
      </BulbContext.Provider>
     
    </div>
  )

  function Light () {
    // bulbOn is a prop to the Bulb State component
    // bulbOn , setBulbOn are props to the ToggleBulbState component

    return <div>
      <LightBulb/>
      <LightSwitch/>
    </div>
  }

  function LightBulb (){
    const {bulbOn} = useContext(BulbContext)
    return <div>
      {bulbOn ? "Bulb on" : "Bulb off"}
    </div>
  }

  function LightSwitch () {
    const {bulbOn,setBulbOn} = useContext(BulbContext)

function toggle () {
  setBulbOn(!bulbOn)
}

    return <div>
      <button onClick={toggle}>Toggle the bulb</button>
    </div>
  }
}

export default App