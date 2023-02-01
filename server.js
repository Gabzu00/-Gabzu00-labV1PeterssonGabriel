// import liberaries and tooles 
const express = require('express')
const app = express()
const database = require('./database')
const prompt = require("prompt-sync")({ sigint: true });


// listening on port
app.listen(5000, () => {
  console.log("Server listening on port: " + 5000)
})

// callback implementation
/* app.get('/allBooks', function (req, res) {

  database.getBooks((rows) => {
    res.json(rows)
  })
}) */

// Promise implementation
app.get('/allBooks', function (req, res) {

  database.getBooks()
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Something whent wrong!")
    })

})

// Callback implementation
/* app.get('/oneBook/:name', function (req, res) {
  //var name = prompt("Enter a book: ")

  database.getBook(req.params['name'], function (answer) {
    res.json(answer);
  })

}) */

// Promise implementation
app.get('/oneBook/:name', function (req, res) {

  database.getBook(req.params.name)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Something went wrong');
    });


})

app.get('/', function (req, res) {
  var welcome = database.welcome()
  res.json(welcome)
})



