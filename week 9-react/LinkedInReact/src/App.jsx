import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [currentTab, setCurrentTab] = useState("feed");
  const [todo, setTodo] = useState({});

  useEffect(() => {
    console.log("send Req to backend to get data for tab ", currentTab);

  }, [currentTab])


  // todo wala 
 function fetchTodo() {
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then(async res => {
        const json = await res.json()
        setTodo(json)
        console.log("Todo aaya:", json)
      })
  }

  return <div>

    <button onClick={() => {
      setCurrentTab("feed")
    }}
      style={{ color: currentTab == "feed" ? "red" : "black" }}>Feed</button>

    <button onClick={() => {
      setCurrentTab("Notificaton")
    }}
      style={{ color: currentTab == "Notificaton" ? "red" : "black" }}>Notificaton</button>

    <button onClick={() => {
      setCurrentTab("Messages")
    }}
      style={{ color: currentTab == "Messages" ? "red" : "black" }}>Messages</button>

    <button onClick={() => {
      setCurrentTab("Jobs")
    }}
      style={{ color: currentTab == "Jobs" ? "red" : "black" }}>Jobs</button>

    {/* todo one */}
    <button onClick={fetchTodo}  
      style={{ color: todo  ? "red" : "black" }}>Todo</button>
    {/* {todo.title} */}
      
  </div>
}

export default App