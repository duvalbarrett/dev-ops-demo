const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
app.use(cors())

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
    res.sendFile(path.join(__dirname, '../client/index.html'))
    rollbar.info('file served')
})

app.get('/style', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.css'))
    rollbar.info('css served')
})

let students = [];

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4004
app.use(rollbar.errorHandler())


app.use("/styles", express.static(path.join(__dirname, "../client/index.css")));

app.listen(port, () => {
    console.log(`listening on warp ${port}`)
})