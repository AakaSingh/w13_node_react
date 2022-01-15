'strict use'

const myMod = require('./src/tableinfile.js')

const express = require('express')
const app = express()

app.get('/users/:filename', function (req, res) {
    myMod.getTable(req.params.filename, function (content) {
        console.log(content)
    })
})

app.post('/users/', function (req, res) {
    myMod.getRec(req.body.filename, req.body.id, function (content) {
        console.log(content)
    })
})
