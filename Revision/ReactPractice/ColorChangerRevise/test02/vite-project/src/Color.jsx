import React from 'react'

const Color = ({setColor}) =>{
    return (
    <div>
        <button onClick={()=>setColor('red')}>
            Click To change color
            </button>
    </div>
  )
}
export default Color