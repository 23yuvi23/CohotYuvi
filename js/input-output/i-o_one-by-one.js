//running one by one 

const fs = require("fs");

const contents = fs.readFileSync("input-output/a.txt", "utf-8"); //bytes, hex
console.log(contents);

const contents2 = fs.readFileSync("input-output/b.txt", "utf-8"); //bytes, hex
console.log(contents2);


