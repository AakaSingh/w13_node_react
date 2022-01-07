'use strict'

console.log('Start of execution')

const fs = require('fs')

// synchronous version
function logMsgSync (msg) {
    createFolder('log')
    msg += '\n'
    fs.appendFileSync('log/server_log.log', msg)
}

// asynchronous version
function logMsg (msg) {
    createFolder('log')
    msg += '\n'
    fs.appendFile('log/server_log.log', msg, function (error) {
        if (error) { console.log(error) } else { console.log('content added') };
    }
    )
}

function createFolder (dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        console.log('Directory created: ', dir)
    }
}
logMsg('Async Content')
logMsg('Async Content more')
logMsgSync('sync content')
