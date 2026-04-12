import { useEffect, useState } from "react"

const App = () => {

const [showTimer , SetShowTimer] = useState(true);
useEffect(()=>{
 setInterval(()=>{
  SetShowTimer(currentValue => !currentValue)
 },5000) 
} , [])

  return (
    <div>
      {showTimer && <Timer/> }
    </div>
  )
}

const Timer = () =>{
  const [second,setSeconds] = useState(0)
  // start a clock 
  console.log("outside the Timer");
  useEffect(()=>{
    let clock = setInterval(()=>{
      setSeconds(prev=>prev+1)
      console.log("inside the Timer ");
    },1000)

    // cleanup function whenever the above component unmpunts
    return (()=>{
      clearInterval(clock)
    })
  },[]);

  // rendered 
  return <div>{second} Seconds Elapsed </div>
}
export default App