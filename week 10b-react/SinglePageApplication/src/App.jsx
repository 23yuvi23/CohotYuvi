import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/"  element = {<Home />} />
          <Route path = "/user1"  element = {<User1 />} />
          <Route path = "/user2"  element = {<User2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Home () {
  return <div>
    Welcome to Home Page
  </div>
}
function User1 () {
  return <div>
    Hello User 1 welcome 
  </div>
}
function User2 () {
  return <div>
    Hello User 2 welcome 
  </div>
}

export default App