import { useState, useCallback, useEffect, useRef } from 'react'  //hooks used are here
function App() {
  const [length , setLength ] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password , setPassword] = useState('')

  const passwordref = useRef(null)
  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*()_+"
    for(let i=1;i<length;i++){
      pass+=str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass) 
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    if (copyPasswordToClipboard){
      passwordref.current?.select()  // highliht the copied text
    }
  }

  useEffect(()=>{
     generatePassword()
  },[length,numberAllowed,charAllowed])

  return (
  <div className="mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
  <div className="h-36 w-full rounded-md bg-gradient-to-r from-pink-100 via-red-200
   to-yellow-500 p-1">
    <h1 className='text-3xl font-bold mb-2 
    text-center'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0,5 cursor-pointer shrink-0'>
        Copy</button>
    </div>

    <div
    className='flex text-sm gap-x-2'
    >
      <div
      className='flex items-center gap-x-1'
      >
        <input 
        
        type="range"
        min={6}
        mac={100} 
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}
        name="" 
        id="" />
        <label htmlFor="length">Length:{length}</label>
      </div>

      <div
      className='flex items-center gap-x-1'
      >
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=> !prev)
        }}
        name=''      
        id="" 
        />
        <label htmlFor="number">Numbers</label>
        
      </div>

            <div
      className='flex items-center gap-x-1'
      >
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=> !prev)
        }}
        name=''      
        id="" 
        />
        <label htmlFor="charInput">Character</label>
      </div>


    </div>
  </div>
</div>
    
 
  )
}

export default App
