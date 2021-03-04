const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()

// liberar o request.body
app.use(express.json())


const projects = [];


const logRequest = (req, res, next) => {

  const { method, url } = req

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)


  next()
}

app.use(logRequest)


app.get("/projects", (req, res) => {

  const { title, owner }  = req.query;

  const results = title 
    ? projects.filter(item => item.title.includes(title)) 
    : projects 

  return res.json(results)

})

app.post('/projects', (req, res) => {

  const { title, owner }  = req.body

  const project = { id: uuid(), title, owner }
  projects.push(project)

  return res.status(201).json(project)

})

app.put('/projects/:id', (req, res) => {

  const {id} = req.params
  const { title, owner } = req.body

  const projectIndex = projects.findIndex(item => item.id === id)

  if (projectIndex < 0) {
    return res.status(404).json( {message: "Project not found"})
  }

  // const project = { ...projects[projectIndex], title, owner}
  const project = { id, title, owner }

  projects[projectIndex] = project

  return res.json(project)

})

app.delete('/projects/:id', (req, res) => {

  const { id } = req.params

  const projectIndex = projects.findIndex(item => item.id === id)

  if (projectIndex < 0) {
    return res.status(404).json( {message: "Project not found"})
  }

  projects.splice(projectIndex, 1)

  return res.status(204).send()

})

app.listen(3333, () => console.log("👻 - Back-end started"))
