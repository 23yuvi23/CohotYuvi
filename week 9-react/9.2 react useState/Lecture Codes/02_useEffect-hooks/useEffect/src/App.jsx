import { useState, useEffect } from "react";

function App() {
  return (
     <div>
      <b>hi there</b>
      {/* //to use below Counter() we have to use it as a tag  */}
      <Counter></Counter>
    </div>
  );
}

//component 2
function Counter() {
  const [count, setCount] = useState(0);

  // this logic i want only run on mounting state
  useEffect(function () {
    setInterval(function () {
      setCount(count=>count + 1);
    }, 1000);
  }, []); 
  //dependency array, cleanup, fetch inside useEffect


  return (
    <div>
      <h1>{count}</h1>
      {/* <button>Increase count</button> */}
    </div>
  );
}
export default App;
