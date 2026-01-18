import React from 'react'
const Color = ({setColor}) => {
  return (
    <div>
        <button  onClick={()=>setColor('red')}> 
            test 
        </button>
    </div>
  )
}

export default Color