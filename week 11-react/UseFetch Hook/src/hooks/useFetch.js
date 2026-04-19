import { useEffect, useState } from 'react'

export function usePostStatus() {

    const [post, setPost] = useState({});
    async function getPosts() {
        const response = await fetch("https://dummyjson.com/test")
        const json = await response.json()
        setPost(json);
    }
    useEffect(() => {
        getPosts()
    }, [])

    return post.status;

}

export function useFetch(url) {
    const [finalData, setFinalData] = useState({})
    const [loading, setLoading] = useState(true)
    console.log(url);
    

    async function getDetails(){
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setFinalData(json)
        setLoading(false);
    }

    useEffect(()=>{
        getDetails();
    },[url])


    //backend mai kuch change hua then real time data will change in every 10 sec
    useEffect(()=>{
        setInterval(getDetails,10 * 1000) 

        return () => {
    clearInterval(intervalId)
  }
  
    },[])

    return {
        finalData,
        loading
    }
}
