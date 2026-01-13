import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App';

const ReactElement = {
    type: "a",
    props: {
        href:"https://google.com",
        target : "_blank"
    },
    children: "click me to visit google"
}

function MyApp(){
  return (
    <div>
      <h1>Custom React App</h1>
    </div>
  )
}

const Another = (
  <a href="https://google.com" target = "_blank">VisitGoogle</a>
)

const WorkingReactElement = React.createElement(
  'a',                                                //element
  {href:"https://google.com" , target: "_blank"},     //attribute
  "click to visit google"                             //children that you actually inject
)

createRoot(document.getElementById('root')).render(
  // WorkingReactElement
  <App/>
)
