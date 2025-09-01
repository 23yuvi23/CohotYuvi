console.log("client");

let backenddata = fetch("http://localhost:3000/todos")

backenddata
    .then((res)=>res.json())
    .then(data=>console.log(data))
    .catch((err)=>console.log(err))
    .finally(()=>console.log("this is from the finally"));
