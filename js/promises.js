//way 1
function names(){
    console.log("yuvi");
}
setTimeout(names, 3000);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//way 2 
function setTimeoutPromisified(ms) {
  let p = new Promise(resolve => setTimeout(resolve, ms));
  return p                            //it is returning an object of the Promise class
}                                                               


function names(){ 
    console.log("yuvi");                                    
}
setTimeoutPromisified(3000).then(names)





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//another eg 
function waitFor3s (resolve){              // resolve = main 
    setTimeout (resolve , 3000)            //wait for 3 seconds
    
}

function main() {
    console.log ("main is called ")
    console.log("3 sec mai aa gya ")
}

waitFor3s(main)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function randon (resolve){               // resolve is also a function 
   setTimeout (resolve,3000);
}

const p = new Promise (randon)    // supposed to return u something eventually



// usning the eventual value returned by the promise
function callback (){
    console.log("promise suceed");
    
}
p.then(callback)

 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//reading a file using promise
const fs = require("fs")
function readTheFile (resolve){
    fs.readFile("temp.txt", "utf-8",function(err,data){
        resolve(data)
    })

}

function readFile (fileName){
    return new Promise(readTheFile);
}

const d = readFile("temp.txt")

function callback(contents){
    console.log(contents);
    
}
d.then(callback)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//chai code//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const promisethree = new Promise ((resolve,reject)=>{
    setTimeout(function(){
        resolve({username: "chai", email: "chai@eg.com"})
    },1000)
})

promisethree.then(function(user){
    console.log(user);
    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const promisefour = new Promise ((resolve,reject)=>{
    setTimeout(()=>{
        let error = false
        if(!error){
            resolve({username: "yuvi", password : "123"})
        } else {
            reject('ERROR: Something went wrong')
        }
    }, 1000)
})

promisefour.then((user)=>{
    console.log(user);
    return user.username
})
.then((username)=>{
    console.log(username);
})
.catch((error)=>{
    console.log(error);    
})
.finally(()=>{
    console.log("the promise is either resolved or rejected");
    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const promisefive =new Promise ((resolve,reject)=>{
    setTimeout(()=>{
        let error = false
        if(!error){
            resolve({username: "mannu", password : "231223"})
        } else {
            reject('ERROR: mannu went wrong')
        }
    }, 1000)
})

async function consumePromiseFive() {

    try{
    const response = await promisefive 
    console.log(response);
    } catch (error){
        console.log(error);
    }
}

consumePromiseFive()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllUsers (){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')   
        // console.log(response);
        const data = await response.json()
        console.log(data);
    } catch (error){
       console.log("err: ",error);
        
    }
}
getAllUsers()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                         OR                                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

fetch('https://jsonplaceholder.typicode.com/users')  
.then((response)=>{
    return response.json()
}) 
.then((data)=>{
    console.log(data);
})
.catch((error)=>console.log(error))