/*
Assignment #1 - Trying to code a todo app and store data into the array
*/

const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('hello world')
})



// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});