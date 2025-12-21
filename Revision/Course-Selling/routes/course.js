function createCourseRoutes(app){
app.post('/course/purchase', (req, res) => {
  res.json({
    message:"course to be purchase endpoint"
  })
})

app.get('/course/preview', (req, res) => {
  res.json({
    message:"all courses endpoint"
  })
})
}