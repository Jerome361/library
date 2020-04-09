const express = require('express');

const bookRouter = express.Router();

// windows linebreaks when not in production environment
"rules"; {
  "linebreak-style"; ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]

// Books collection array
function router(nav) {
  let books = [
    {
      title: 'A journey into the center of the earth',
      genre: 'Science Fiction',
      author: 'Jule Verne',
      read: false,
    },
    {
      title: 'The dark world',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false,
    },
    {
      title: 'The wind in the willows',
      genre: 'Fantasy',
      author: 'keneth Grahame',
      read: false,
    },
    {
      title: 'War and peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false,
    },
    {
      title: 'Les Miserable',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false,
    },
  ];

  // Display book catalogue
  bookRouter.route('/').get((req, res) => {
    res.render('bookList', {
      nav,
      title: 'Book repository',
      books,
    });
  });

  // Specific book route
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;

    res.render('bookView', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' },
      ],
      title: 'Book Details',
      book: books[id],
    });
  });
  return bookRouter;
}

//Exports
module.exports = router;
