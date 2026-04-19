import React, { useState } from 'react'

// custom Hook 
function useCounter() {
  const [count,setCount] = useState(0)

  function increaseCount(){
    setCount(count+1)
  }
  return{
    count,
    increaseCount
  }
}

function Counter () {
  const{count, increaseCount} = useCounter();
  return (
    <div>
      <button onClick={increaseCount}>ClickME   {count}</button>
    </div>
  )
}

// component
const App = () => {
  return <div>
    <Counter />
    <Counter />
    <Counter />
    <Counter />
    <Counter />
    <Counter />
  </div>
}

export default App