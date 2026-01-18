import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('olive')

// function changeColor(color){
//   setColor(color)
// }

  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
       <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-amber-200 px-3 py-2 rounded-3xl'>

      <button 
      onClick={()=>setColor('red')} 
      className='cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'Red',color :'white'}}
      >Red</button>

      <button 
        onClick={()=>setColor('blue')}  
      className=' cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'blue',color :'white'}}
      >Blue</button>


      <button 
        onClick={()=>setColor('black')}  
      className=' cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'black', color :'white'}}
      >black</button>

      <button 
        onClick={()=>setColor('purple')}  
      className=' cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'purple', color :'white'}}
      >purple</button>

       <button 
        onClick={()=>setColor('green')}  
      className=' cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'green', color :'white'}}
      >green</button>

      <button 
        onClick={()=>setColor('pink')}  
      className=' cursor-pointer outline-none px-4 py-1 rounded-full shadow-lg text-black'
      style={{backgroundColor: 'pink', color :'white'}}
      >pink</button>




      </div>
      </div>      
    </div>
  )
}

export default App
