//axios vs fetch

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------//using fetch ----------------------
//using .then + async await ----------------------------
/* 
function main(){
    fetch("http://localhost:3000/todo")
        .then(async response =>{
            const json = await response.json();
            console.log(json);
    })
}
main()
*/

//using async await ---------------------------------
/*
async function main(){
  const response = await fetch("http://localhost:3000/todo");
  const data = await response.json();
  console.log(data);
}
main();
*/

// ---------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------using axios library ----------------------------------------


/*
const axios = require("axios")
async function main(){
    const response = await axios.get("http://localhost:3000/todo")  //if get request
    // const response = await axios.post("http://localhost:3000/todo")  //if POST request
    console.log(response.data);
}
main()   //calling of main function we defined above
*/

// ------------------------------------------  sending POST req and getting data basically way to change the method using axios --------------------------
/*
const axios = require("axios")
async function main (){
    const response = await axios.post("https://www.postb.in/1760003826903-8586346828378")
    console.log(response.data);
}
main();
*/

// ----------------------------------------------------------------------------------------------------------------
//change request method
//send body     
//send headers 

const axios = require("axios")
async function main (){
    const response = await axios.post("https://httpdump.app/dumps/dedb0a12-415d-474c-b9a3-46c33eef2456",{
        // Body (2nd argument)
        username : "yuvi",
        password : "1234"
    },
    {
         // Headers (3rd argument)
         headers:{
             Authorization : "Bearer 123",
         },
    }
);

    console.log(response.data);
}
main();