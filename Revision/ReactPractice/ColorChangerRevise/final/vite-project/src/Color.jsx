import React from 'react'

const Color = ({setColor}) => {
  return (
    <div>
        <button
        onClick={()=>setColor("red")}
        >Clickme</button>
    </div>
  )
}

export default Color