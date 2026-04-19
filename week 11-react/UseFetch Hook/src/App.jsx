import React, { useEffect, useState } from 'react'
import { useFetch, usePostStatus } from './hooks/useFetch'

const App = () => {
  const [currentPost, setCurrentPost] = useState(1)
const {finalData,loading} = useFetch("https://jsonplaceholder.typicode.com/todos/"+currentPost);

if(loading) {
  return <div>
    loading...
  </div>
}

  return (
    <div>
      <button onClick={()=>setCurrentPost(1)}>1</button>
      <button onClick={()=>setCurrentPost(2)}>2</button>
      <button onClick={()=>setCurrentPost(3)}>3</button>
      {JSON.stringify(finalData)}
    </div>
  )
}

export default App