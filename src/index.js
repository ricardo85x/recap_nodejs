const express = require('express')

const app = express()

// liberar o request.body
app.use(express.json())

app.get("/projects", (req, res) => {

  const { title, owner }  = req.query;

  console.log(title)
  console.log(owner)

  return res.json([
    'Projeto 1',
    'Projeto 2'
  ])

})

app.post('/projects', (req, res) => {

  const { title, owner }  = req.body

  console.log(owner)
  console.log(title)

  return res.status(201).json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ])

})

app.put('/projects/:id', (req, res) => {

  const {id} = req.params

  console.log(id)

  return res.json([
    'Projeto 1',
    'Projeto 22',
    'Projeto 3'
  ])

})

app.delete('/projects/:id', (req, res) => {
  
  return res.json([
    'Projeto 1',
    'Projeto 3'
  ])

})

app.listen(3333, () => console.log("👻 - Back-end started"))
