import { useState } from "react";

function App() {
  return  <div>
    <b>
    hi there 
    </b>
        {/* //to use below Counter() we have to use it as a tag  */}
    <Counter></Counter>

    </div>

}


//component 2 
function Counter(){
  const [count, setCount] = useState(0);
// let count = 0;

// setInterval(function(){
//   setCount(count+1)
// },1000)


// we define componet inside the original component itself
  function increaseCount(){
  //we dont use document.get  something called raw dom instead we do is 
  setCount (count+1)
  // count = count+1   
}

function decreaseCount(){
  setCount (count-1)
}

function resetCount(){
  setCount(0)
}

  return <div>
    <h1>{count}</h1>
    <button onClick={increaseCount}>Increase count</button>
    <button onClick={decreaseCount}>Decrease count</button>
    <button onClick={resetCount}>Reset count</button>
  </div>
}
export default App
