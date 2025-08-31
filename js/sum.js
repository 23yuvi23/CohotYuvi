function sum(a,b){
    return a+b;
}

let answ =  sum(2,3)
console.log(answ)


function sum2(n){
    let ans = 0;
    for(let i = 1;i < n;i++){
        ans=ans+i
    }
    return ans
}

const ans = sum2(100);
console.log(ans)