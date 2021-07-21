const cron = require('node-cron')
const fs = require('fs')

const gamestop = require('./gamestop')
const walmart = require('./walmart')
const target = require('./target')

let previousCheck = {}
const changes = []
let amountRuns = 0

const compareTwoObj = (obj1, obj2) => {
  return Object.keys(obj1).every(
    key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
  )
}

const run = () => {
  Promise.all([gamestop(), walmart(), target()])
    .then(res => {
      const obj = res.reduce((acc, ite) => {
        acc[ite.store] = ite.status
        return acc
      }, {})

      if (!compareTwoObj(obj, previousCheck)) {
        changes.push({ ...obj, time: Date.now(), amountRuns })
        fs.writeFile('./data.json', JSON.stringify(changes), function (err) {
          if (err) return console.log(err)
          console.log('Updated data.json file')
        })
      } else {
        console.log('No changes')
      }
      previousCheck = obj
    })
    .catch(e => {
      console.log(e)
    })
}

cron.schedule('* * * * *', () => {
  amountRuns += 1
  run()
})
