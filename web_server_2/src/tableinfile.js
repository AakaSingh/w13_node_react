'use strict'

const fs = require('fs')

function getTable (filename, resultCallback) {
    fs.readFile(filename, 'utf8',
    // callback function to be executed after the file has been read
        (err, fileContent) => {
            if (err) throw err
            resultCallback(fileContent)
        })
}

function getRec (filename, id, resultCallback) {
    fs.readFile(filename, 'utf8',
    // callback function to be executed after the file has been read
        (err, fileContent) => {
            if (err) throw err
            const content = JSON.parse(fileContent)
            let index = -1
            for (let i = 0; i < content.length; i++) {
                if (content[i].id === id) {
                    index = i
                }
            }
            if (index === -1) {
                throw new Error('ID does not exist!')
            } else {
                resultCallback(content[index])
            }
        }
    )
}

function saveTable (filename, datas) {
    const data = JSON.stringify(datas, null, 2)
    if (fs.existsSync(filename)) {
        fs.unlinkSync(filename)
    }
    fs.writeFile(filename, data, (err) => {
        if (err) throw err
        console.log('Data written to file')
    })
}

function addRec (filename, data) {
    fs.readFile(filename, 'utf8',
    // callback function to be executed after the file has been read
        (err, fileContent) => {
            if (err) throw err
            let index = -1
            const content = JSON.parse(fileContent)
            for (let i = 0; i < content.length; i++) {
                if (data.id === content[i].id) {
                    index = i
                }
            }
            if (index !== -1) {
                console.log('id already exists')
            } else {
                content.push(data)
                fs.unlink(filename, (err) => {
                    if (err) throw err
                    const newData = JSON.stringify(content, null, 2)
                    fs.writeFile(filename, newData, (err) => {
                        if (err) throw err
                        console.log('record added')
                    })
                })
            }
        }
    )
}

function updateRec (filename, data) {
    fs.readFile(filename, 'utf8',
    // callback function to be executed after the file has been read
        (err, fileContent) => {
            if (err) throw err
            let index = -1
            const content = JSON.parse(fileContent)
            for (let i = 0; i < content.length; i++) {
                if (data.id === content[i].id) {
                    index = i
                }
            }
            if (index === -1) {
                console.log('id does not exist')
            } else {
                content[index] = data
                fs.unlink(filename, (err) => {
                    if (err) throw err
                    const newData = JSON.stringify(content, null, 2)
                    fs.writeFile(filename, newData, (err) => {
                        if (err) throw err
                        console.log('record updated')
                    })
                })
            }
        }
    )
}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec
}
