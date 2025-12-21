function createUserRoutes(app){
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
}
module.exports= {
    createUserRoutes:createUserRoutes
}