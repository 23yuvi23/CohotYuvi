function greet (user){
    // console.log("hi "+ user.name+ "your age is " + user.age);
}
let user = {
    name: "yuvi",
    age: 20
}

greet (user)


// Write a function that takes a new object as input which has `name` , `age` and `gender` and greets the user with their gender (Hi `Mr/Mrs/Others` harkirat, your age is 21)

let arr = ["yuvi", 23, {
    name: "yuvi",
    age: 23
}];

const val1= arr[2];

const val2 = {
    name: "harkirat",
    age:23
}

// console.log(val1)
// console.log(val2)



function checkAgeAndGender (arr){

    let arr2=[];
    for(let i = 0; i< arr.length; i++){
        if (arr[i].gender === "male" && arr[i].age> 18){
            arr2.push(arr[i])
        }
    }
return arr2;
}

const users= [{
    name:"yuvi",
    age:21,
    gender:"male"
},{
    name:"yuko",
    age:21,
    gender:"female"
},{
    name:"yuvi",
    age:18,
    gender:"male"
}]

const ans = checkAgeAndGender(users);
console.log(ans);

