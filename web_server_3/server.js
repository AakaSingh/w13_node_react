'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const DB = require('./src/dao.js')

//   use ejs template engine
app.set('view engine', 'ejs')
app.use(express.static('public_html'))
app.use(cors())

app.use(express.urlencoded())
app.use(express.json())

app.get('/offices/:code', function (req, res) {
    const officeCode = req.params.code
    DB.connect()
    DB.queryParams('select * from offices where officecode = $1', [officeCode], function (officeInfo) {
        if (officeInfo.rowCount === 0) {
            res.writeHead(401, { 'Content-Type': 'text/html' })
            res.end('not found')
        } else {
            const infoJSON = { officeInfo: officeInfo.rows }
            const infoJSONString = JSON.stringify(infoJSON, null, 4)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(infoJSONString)
        }
        DB.disconnect()
    })
})

app.get('/offices', function (request, response) {
    DB.connect()
    DB.query('select * from offices', function (offices) {
        const officesJSON = { offices: offices.rows }
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officesJSONString)
    })
})

app.delete('/offices/:code', function (request, response) {
    const code = request.params.code // read the :id value send in the URL
    console.log('this is the code')
    console.log(code)
    DB.connect()
    DB.queryParams('DELETE from offices WHERE officecode=$1', [code], function (customers) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK office deleted')
    })
})

app.post('/offices', function (request, response) {
    DB.connect()
    DB.queryParams('select * from offices where officecode = $1', [request.body.code], function (offices) {
        if (offices.rowCount > 0) {
            DB.queryParams('update offices set city = $2, phone = $3, addressline1 = $4, addressline2 = $5, state = $6, country = $7, postalcode = $8, territory = $9 where officecode = $1', [
                request.body.code,
                request.body.city,
                request.body.phone,
                request.body.addr1,
                request.body.addr2,
                request.body.state,
                request.body.country,
                request.body.pcode,
                request.body.territory
            ], function (offices) {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                // send out a string
                response.end('Office Updated')
            })
        } else {
            DB.queryParams('insert into offices values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
                request.body.code,
                request.body.city,
                request.body.phone,
                request.body.addr1,
                request.body.addr2,
                request.body.state,
                request.body.country,
                request.body.pcode,
                request.body.territory
            ], function (offices) {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                // send out a string
                response.end('Office Added')
            })
        }
    })
})
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
