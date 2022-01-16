'strict use'

const myMod = require('./src/tableinfile.js')

const express = require('express')
const app = express()
const filename = './users.json'
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/users/', function (req, res) {
    myMod.getTable(filename, function (content) {
        res.statusMessage = 'all ok'
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(content))
    })
})

app.get('/users/:id', function (req, res) {
    myMod.getRec(filename, parseInt(req.params.id), function (content) {
        res.statusMessage = 'all ok'
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(content))
    })
})

app.post('/users/', function (req, res) {
    const data = req.body
    myMod.saveTable(data.filename, data.content)
})

app.post('/users/add', function (req, res) {
    myMod.addRec(filename, req.body)
})

app.post('/users/update', function (req, res) {
    myMod.updateRec(filename, req.body)
})
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
