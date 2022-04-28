const express = require('express')
const path = require('path')
const app = express()

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '45c47a7be63f444ea34933a626cbe14b',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

let students = []
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    res.status(200).send(students)
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4004


app.listen(port, () => {
    console.log(`listening on warp ${port}`)
})