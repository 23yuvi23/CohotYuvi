const express = require('express')
const app = express()
const port = 3000

app.post('/user/signup', (req, res) => {
  res.json({
    message:"signup endpoint"
  })
})

app.post('/user/signin', (req, res) => {
  res.json({
    message:"signin endpoint"
  })
})

app.get('/user/purchases', (req, res) => {
  res.json({
    message:"purchases endpoint"
  })
})

app.post('/course/purchase', (req, res) => {
  res.json({
    message:"course to be purchase endpoint"
  })
})

app.get('/courses', (req, res) => {
  res.json({
    message:"all courses endpoint"
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
