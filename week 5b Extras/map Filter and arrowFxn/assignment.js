//create a map function that takes 2 inputs 
//an array, and a transformation callback/fn
//and transforms the array into a new one using the transformation fxn

const arr = [1,2,3,4,5,6]
const ans = arr.map(function transform(i){
    return i*3
})
console.log(ans);
