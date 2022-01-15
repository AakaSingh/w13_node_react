'use strict'

const myMod = require('./src/tableinfile.js')
const assert = require('assert')

myMod.getTable('./cars.json', function (content) {
    console.log(content)
    assert.deepStrictEqual(content, [
        {
            id: 100,
            username: 'aaka98',
            age: 55
        },
        {
            id: 101,
            userName: 'jcote',
            age: 66
        },
        {
            id: 102,
            userName: 'pmartineau',
            age: 99
        },
        {
            id: 105,
            username: 'aaka',
            age: 23
        }
    ])
})
// myMod.getRec('./users.json', 101, function (content) {
//     console.log(content)
// assert.deepStrictEqual(content, {
//     id: 101,
//     userName: 'jcote',
//     age: 66
// })
// })

// const newRecord = { id: 105, username: 'aaka', age: 23 }
// myMod.addRec('./users.json', newRecord)

// const updateRecord = { id: 100, username: 'aaka98', age: 55 }
// myMod.updateRec('./users.json', updateRecord)

// const newFileContent = {
//     cars: {
//         Nissan: [
//             { model: 'Sentra', doors: 4 },
//             { model: 'Maxima', doors: 4 },
//             { model: 'Skyline', doors: 2 }
//         ],
//         Ford: [
//             { model: 'Taurus', doors: 4 },
//             { model: 'Escort', doors: 4 }
//         ]
//     }
// }

// myMod.saveTable('./cars.json', newFileContent)
