const express = require('express')
const { connectToDb, getDb } = require('./db')

const app = express()
app.use(express.json())

// db connection
let db

connectToDb((error) => {
  if (!error) {
    // listening output
    app.listen(3000, () => {
      console.log('Listening to the PORT: 3000')
    })
    db = getDb()
  }
})

// routhe to all data
app.get('/url_data', (req, res) => {
  let contents = []

  db.collection('url_data')
    .find() // kinda iterator in C++, it will iterate throw DB data
    .sort({ name: 1})
    .forEach(content => contents.push(content))
    .then(() => {
      res.status(200).json(contents) // all ok
    })
    .catch(() => {
      res.status(500).json({error: 'Failed to fetch !'}) // problem
    })
})

// routhe to name GET
app.get('/url_data/:name', (req, res) => {
  // if (!req.params.name) {
  //   res.status(200).json({message: 'Nothing'})
  // }

  db.collection('url_data')
    .findOne({name: req.params.name})
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      res.status(500).json({error: 'Failed to fetch !'})
    })
})

// routhe to name SET
app.post('/url_data', (req, res) => {
  const data = req.body

  db.collection('url_data')
    .insertOne(data)
    .then(result => {
      res.status(201).json(result) // success
    })
    .catch(err => {
      res.status(500).json({error: 'Failed to create !'})
    })
})












