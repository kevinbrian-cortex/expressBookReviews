const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if(typeof username === "undefined" || typeof password === "undefined"){

    return res.status(200).json({message : "username &/ password are not provided."})
  
  }

  const userExist = users.find((user)=> user.username === username);
  
  if(userExist){
  
    return res.status(200).json({message : "username already exists"})
  
  }else{
  
    return res.status(300).json({message : "User registered"});
  
  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const allBooks = JSON.stringify(books);
  return res.status(300).json(allBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // get isbn from params
  const result = books[isbn]; // retrieve book by isbn numebr
  return res.status(300).json(result);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  //get author from params
  const author = req.params.author;

  //init allbooks array
  let allBooks = [];

  //iterate through all books and get keys
  for (const key in books) {
    if (Object.hasOwnProperty.call(books, key)) {
      
      //get book by key
      const book = books[key];

      //push each book to allbook array
      allBooks.push(book)
    }
  }

  //filter by author
  const findByAuthor = allBooks.filter((book)=> book.author === author)
  
  return res.status(300).json(findByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //get author from params
  const title = req.params.title;

  //init allbooks array
  let allBooks = [];

  //iterate through all books and get keys
  for (const key in books) {
    if (Object.hasOwnProperty.call(books, key)) {
      
      //get book by key
      const book = books[key];

      //push each book to allbook array
      allBooks.push(book)
    }
  }

  //filter by title
  const findByTitle = allBooks.filter((book)=> book.title === title)
  
  return res.status(300).json(findByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;

  const reviews = books[isbn].reviews;

  return res.status(300).json({reviews});
});

module.exports.general = public_users;
