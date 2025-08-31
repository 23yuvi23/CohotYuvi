let firstname = "John";     // Variable that can be reassigned
const age = 30;        // Constant variable that cannot be reassigned
var isStudent = true;  // Older way to declare variables, function-scoped

// console.log(firstname);
// console.log(age);
// console.log(isStudent);


function greet (name){
    return "Hello, " + name;
}

let message = greet("yuvi")
console.log(message)

function sum (a,b){
    let totalsum=a+b;
    return totalsum; 
}

let ans = sum(1,2)
let ans2 = sum(2,2)

// console.log(ans)
// console.log(ans2)


function canvote (age){
    if (age>18){
        return true
    } else {
        return false
    }
}

let age1 = canvote(19);
let age2 = canvote(9);

// console.log(age1,age2)


function total (n){
    let totalsum = 0;
    for (let i =0 ; i <=n; i++){
       totalsum = totalsum+i
    }
    console.log(totalsum);
}

total(5);