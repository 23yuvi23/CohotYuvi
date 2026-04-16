import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, redirect, Outlet } from "react-router-dom"

const App = () => {
  return (
    <div>

      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Layout />} >

            <Route path="/" element={<Home />} />
            <Route path="/user1" element={<User1 />} />
            <Route path="/user2" element={<User2 />} />
            <Route path="*" element={<ErrorPage />} />

          </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

function Layout() {
  return <div>
    <Link to="/">Home</Link>  || <Link to="/user1">User1</Link>  || <Link to="/user2">User2</Link>   {/*Header here */}
    <Outlet />                     {/*Rest content with / path will be rendered here  */}

    I am a footer  {/*Footer  here */}
  </div>
}

function Home() {
  return <div>
    Welcome to Home Page
  </div>
}
function User1() {
  return <div>
    Hello User 1 welcome
  </div>
}
function ErrorPage() {
  return <div>
    Sorry Page not found
  </div>
}
function User2() {
  // using hook want user to go back to / page after 10 sec 
  const navigate = useNavigate();

  function redirectUser() {
    navigate('/')
  }
  return <div>
    Hello User 2 welcome
    <button onClick={redirectUser}>Go back to landing page </button>
  </div>
}

export default App