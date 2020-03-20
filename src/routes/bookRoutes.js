const express = require('express');
const bookRouter = express.Router();

let books = [
  {
    title:'A journey into the center of the earth',
    genre:'Science Fiction',
    author:'Jule Verne',
    read: false
  },
  {
    title:'The dark world',
    genre:'Fantasy',
    author:'Henry Kuttner',
    read: false
  },
  {
    title:'The wind in the willows',
    genre:'Fantasy',
    author:'keneth Grahame',
    read: false
  },
  {
    title:'War and peace',
    genre:'Historical Fiction',
    author:'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title:'Les Miserable',
    genre:'Historical Fiction',
    author:'Victor Hugo',
    read: false
  }
]

bookRouter.route('/').get((req, res)=>{
  res.render('bookList', {
    nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }], 
    title: 'Book repository',
    books
  });
});

bookRouter.route('/:id').get((req, res)=>{
  const {id} = req.params

  res.render('bookView', {
    nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }], 
    title: 'Book Details',
    book: books[id]
  });
});


module.exports = bookRouter