const express = require('express');

const bookRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

function router(nav) {
  // authorising access to only signed in users;
  bookRouter.use((req, res, next) => {
    if (req.user) next();
    else res.redirect('/');
  });
  // Display book catalogue;
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017/myLibraryApp';

    (async function mongo() {
      let client;
      try {
        // Connecting to the server
        client = await MongoClient.connect(url);
        console.log('Server connection successful');

        // Create a new database instance
        const db = client.db();

        // Create a collection instance and insert books to it.
        const col = await db.collection('books');

        // fetch books
        const books = await col.find().toArray();
        await console.log(books);

        res.render('bookList', {
          nav,
          title: 'Book repository',
          books
        });
      } catch (err) {
        console.err(`Database error ${err}`);
      }

      client.close();
    }());
  });

  // Specific book route
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;

    const url = 'mongodb://localhost:27017/myLibraryApp';

    (async function mongo() {
      let client;
      try {
        // Connecting to the server
        client = await MongoClient.connect(url);
        console.log('Server connection successful');

        // Create a new database instance
        const db = client.db();

        // Create a collection instance and insert books to it.
        const col = await db.collection('books');

        // fetch specific books
        const book = await col.findOne({ _id: ObjectId(id) });
        await console.log(book);

        res.render('bookView', {
          nav: [
            { link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' },
          ],
          title: 'Book Details',
          book
        });
      } catch (err) {
        console.err(`Database error ${err}`);
      }

      client.close();
    }());
  });
  return bookRouter;
}

// Exports
module.exports = router;
