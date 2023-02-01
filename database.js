const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to a database

function connect() {
  const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  })
  return db
}


const prompt = require("prompt-sync")({ sigint: true });
/* var answer = prompt("Enter a name of a book: ")
getBook(answer);
getBooks(); */


function createTable() {
  //create a table
  sql = 'CREATE TABLE books(name, genre, date, author)'
  db.run(sql);
}

function dropTable() {
  // Drop table
  db.run("DROP TABLE books");
}

function insertData() {
  // insert into databse
  sql = 'INSERT INTO books(name, genre, date, author) VALUES (?,?,?,?)';
  db.run(
    sql,
    ["Hunger Games", "fantacy", "23 mars 2012", "Suzanne Collins"],
    (err) => {
      if (err) return console.error(err.message);
    }
  )
}

/* function updateData() {
  // update data
  sql = 'UPDATE users SET first_name = ? WHERE id = ?';
  db.run(sql, ['Gabbe', 1], (err) => {
    if (err) return console.error(err.message);
  })
} */

function deleteData() {
  // delete data
  sql = 'DELETE from users WHERE id=?';
  db.run(sql, [1], (err) => {
    if (err) return console.error(err.message);
  });
}

function selectEverything() {
  // query the database for everything in books table
  sql = 'SELECT * FROM books';
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message)
    rows.forEach(row => {
      console.log(row);
    })
  })
}

// Callback implementation
/* function getBooks(callback) {
  var db = connect();
  var sql = 'SELECT * from books';
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    callback(rows);
  });
} */

const getBooks = () => {
  var db = connect();
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * from books';
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  })

}

// Callback implementation
/* function getBook(name, callback) {
  var db = connect();
  sql = "SELECT * FROM books WHERE NAME = '" + name + "'"
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message)
    callback(rows)
  })
} */

const getBook = (name) => {
  var db = connect();
  return new Promise((resolve, reject) => {
    sql = "SELECT * FROM books WHERE NAME = ?"
    db.all(sql, [name], (err, rows) => {
      if (err) return reject(err);
      resolve(rows)
    })
  })

}


const welcome = () => {
  var welcome = "Hello ! Welcome to our bookstore"
  return welcome
}


module.exports = {
  getBooks,
  getBook,
  welcome,
}


