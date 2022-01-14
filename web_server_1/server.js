'use strict'

// let http = require('http')

// //create server object
// http.createServer(function (request,response){
//     response.writeHead(200, {'Content-Type' : 'text/html'})
//     response.write('<h1>Hello World</h1>')
//     response.end()
// }).listen(8000)

// console.log("server listening on port 8000")

// use express framework

const express = require('express')
const app = express()
const path = require('path')

//   use ejs template engine
app.set('view engine', 'ejs')
app.use(express.static('public_html'))

app.get('/',
    function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        // res.send('<h1>Hello World</h1>')
        res.end()
    }
)

app.get('/byebye',
    function (req, res) {
        res.send('<h3>Bye Bye World</h3>')
    }
)

// sending files
app.get('/filecall',
    function (req, res) {
        const filename = path.join(__dirname, 'public_html', 'test.html')
        res.sendFile(filename)
    }
)

const DB = require('./src/dao.js')

// app.get('/customers',
//     function (res, req) {
//         DB.connect()
//         DB.query('select * from customers', function (result) {
//             console.log(result)
//         })
//     })

app.get('/orders', function (request, response) {
    DB.connect()
    DB.query('SELECT * from orders', function (orders) {
        let html = ''
        html += 'Number of orders: ' + orders.rowCount + '<br>'
        html += '<table><tr><th>Order Number</th><th>Order Date</th><th>Order Status</th></tr>'
        for (let i = 0; i < orders.rowCount; i++) {
            html += '<tr><td>' +
                    orders.rows[i].ordernumber + '</td><td>' +
                    orders.rows[i].orderdate + '</td><td>' +
                    orders.rows[i].status + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Orders List-blabla.com'
        pageData.description = 'Orders Number and Name'
        pageData.author = 'Aakash Singh'
        pageData.navitems = "<a href='/products'> Products </a>"
        pageData.navitems += '<a href="/byebye"> Bye Bye </a> '
        pageData.navitems += '<a href="/"> Home </a> '
        pageData.navitems += '<a href="/seasons"> Seasons </a> '
        pageData.navitems += '<a href="/form_post.html"> form </a> '
        pageData.navitems += '<a href="/orders"> Orders </a>'
        // send out the html table
        pageData.content = html
        response.render('new_template', pageData)
        DB.disconnect()
    })
})

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

app.get('/test-param/:a/:b',
    function (req, res) {
        console.log(req.params.a)
        console.log(req.params.b)
        res.send('found')
    })

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})

app.get('/seasons', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Seasons'
    pageData.description = 'list of all seasons'
    pageData.author = 'Aakash Singh'
    pageData.navitems = "<a href='/products'> Products </a>"
    pageData.navitems += '<a href="/byebye"> Bye Bye </a> '
    pageData.navitems += '<a href="/"> Home </a> '
    pageData.navitems += '<a href="/seasons"> Seasons </a> '
    pageData.navitems += '<a href="/form_post.html"> form </a> '
    pageData.navitems += '<a href="/customer_search_form.html"> Customer Search </a> '
    const seasons = ['summer', 'winter', 'spring', 'fall']
    pageData.content = '<table>'
    for (let i = 0; i < seasons.length; i++) {
        pageData.content += '<tr><td>' + seasons[i] + '</td></tr>'
    }
    pageData.content += '</table>'
    res.render('new_template', pageData)
})

app.post('/customer_search_id', function (req, res) {
    const pageData = {}
    console.log(req.body)
    const customerId = req.body.customer_id
    DB.connect()
    DB.queryParams('select * from customers where customernumber = $1', [customerId], function (customerInfo) {
        let html = ''
        if (customerInfo.rowCount === 0) {
            html = 'No customers found with that id'
        } else {
            html += '<table><tr><th>Cutomer Id</th><th>Customer Name</th><th>Last Name</th><th>First Name</th><th>City</th></tr>'
            html += '<tr><td>' +
                    customerInfo.rows[0].customernumber + '</td><td>' +
                    customerInfo.rows[0].customername + '</td><td>' +
                    customerInfo.rows[0].contactlastname + '</td><td>' +
                    customerInfo.rows[0].contactfirstname + '</td><td>' +
                    customerInfo.rows[0].city + '</td></tr>'
            html += '</table>'
        }
        pageData.content = html
        pageData.title = 'Customer Details'
        pageData.description = 'Customer Details'
        pageData.author = 'Aakash Singh'
        pageData.navitems = "<a href='/products'> Products </a>"
        pageData.navitems += '<a href="/byebye"> Bye Bye </a> '
        pageData.navitems += '<a href="/"> Home </a> '
        pageData.navitems += '<a href="/seasons"> Seasons </a> '
        pageData.navitems += '<a href="/form_post.html"> form </a> '
        res.render('new_template', pageData)
        DB.disconnect()
    })
})

app.get('/customers', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        const customersJSON = { customers: customers.rows }
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(customersJSONString)
    })
})

app.get('/employees', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from employees', function (employees) {
        const customersJSON = { employees: employees.rows }
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(customersJSONString)
    })
})

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('DELETE from customers WHERE customernumber=$1', [id], function (customers) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK customer deleted')
    })
})

app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
