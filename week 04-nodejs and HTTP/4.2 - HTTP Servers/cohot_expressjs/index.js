
import express from 'express'

const app = express()

// route handlers for /
// / route
// GET method

app.get('/', (req, res) => {
  res.send('Hello World')
})


//route handler for /asd
// /asd route
// GET method
app.get('/asd', (req, res) => {
//req -> gives all thing related to request 
//res -> respond back any data to frontend etc
  res.send('i am asd')
//   res.send('i am asd') // it will give error req can be only send once 

})



app.listen(3000)