// running all task together 

function timeout (){
    console.log("lo mai aa gaya")
}

console.log("pehle se hi tha");

setTimeout(timeout,1000)                   //i/o intensive

console.log("last se hi tha");

let c =0;
for(let i = 0 ; i<1000000000;i++){        //cpu intensive
    c=c+1
}
console.log("expensive done");