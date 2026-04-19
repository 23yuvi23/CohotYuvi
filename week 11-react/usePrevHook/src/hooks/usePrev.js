import { useEffect } from "react"
import { useRef } from "react"


export const usePrev = (value) => {
    const ref = useRef()

    useEffect(()=>{
        ref.current = value
        console.log("Effect");
        
    },[value])

    console.log("return");
    return ref.current;
    
    
}
// property of react it returns first Effect will run 