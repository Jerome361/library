const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();

// // windows linebreaks when not in production environment
// "rules" = {
//     "linebreak-style" : ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
//   }
  
const books = [
  {
    title: 'A journey into the center of the earth',
    genre: 'Science Fiction',
    author: 'Jule Verne',
    bookId: 656,
    read: false,
  },
  {
    title: 'The dark world',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    bookId: 24280,
    read: false,
  },
  {
    title: 'The wind in the willows',
    genre: 'Fantasy',
    author: 'keneth Grahame',
    bookId: 126,
    read: false,
  },
  {
    title: 'War and peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 126,
    read: false,
  },
  {
    title: 'Les Miserable',
    genre: 'Historical Fiction',
    bookId: 313,
    author: 'Victor Hugo',
    read: false,
  },
];

function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017/myLibraryApp';
    // const dName = 'myLibraryApp'

    (async function mongo() {
      let client;
      try {
        // Connecting to the server
        client = await MongoClient.connect(url);
        console.log('Server connection successful');

        // Create a new database instance
        const db = client.db();

        //Create a collection instance and insert books to it.
        const response = await db.collection('books').insertMany(books);
        res.json(response);

      } catch (err) {
        console.err('Database error ' + err);
      }

      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
