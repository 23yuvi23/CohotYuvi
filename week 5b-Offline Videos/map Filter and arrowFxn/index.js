//normal function 
function sum(a,b){
    return a+b
}

//arrow fxn 
const sum = (a,b)=>{
    return a+b
}

const ans = sum(1,2)
console.log(ans);


//map in js
//given an array give me back a new array in which every value is multiplied by 2 
//[1,2,3,4,5]  - input 
//[2,4,6,8,10] -output


//without map
const input = [1,2,3,4,5]
const newArr = []
for (let i =0 ; i<input.length ;i++){
    newArr.push(input[i]*2);
} 
console.log(newArr);


//with map
const input2 = [1,2,3,4,5]
function transform(i) {
    return i *2;
}
const answer = input2.map(transform);
console.log(answer)

//or with map way 2 
const input3 = [1,2,3,4,5]
const answer3 = input3.map(function transform(i) {
    return i *2;
});
console.log(answer3)


//filtering 
// what if i tell u give me given an input array , give me all the even values form it 
//[1,2,3,4,5]  - input 
//[2,4]        -output

//without filter 
const array =[1,2,3,4,5]
const newArray = []
for (let i =0 ;i<array.length;i++){
    if(array[i]%2 ==0){
        newArray.push(array[i])
    }
}
console.log(newArray);

//with filter 
//a function which will check condition 
const array2 =[1,2,3,4,5]
function filterLogic(n){
    if(n%2==0){
        return true
    }else{
        return false
    }
}
const answ = array2.filter(filterLogic)
console.log(answ);

//with filter way 2 passing fxn inside the filter itself
const answe = array2.filter(function (n){
    if(n%2==0){
        return true
    }else{
        return false
    }
})
console.log(answe);

