// // windows linebreaks when not in production environment
// "rules" = {
//   "linebreak-style" : ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
// }
const { MongoClient, ObjectId } = require('mongodb');

function bookController(nav, bookService) {
    // Authorisation
    function middleware(req, res, next) {
        if (req.user) next();
        else res.redirect('/');
      }
      // Index route
  function getIndex(req, res) {
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

        // fetch books;
        const books = await col.find().toArray();
        await console.log(books);

        res.render('bookList', {
          nav,
          title: 'Book repository',
          books,
        });
      } catch (err) {
        console.err(`Database error ${err}`);
      }

      client.close();
    }());
  }
  // Question ID route
  function getById(req, res) {
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

        //good reads service
        book.details = await bookService.getBookById(book.bookId)

        res.render('bookView', {
          nav: [
            { link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' },
          ],
          title: 'Book Details',
          book,
        });
      } catch (err) {
        console.err(`Database error ${err}`);
      }

      client.close();
    }());
  }

  return {
    middleware,
    getIndex,
    getById,
  };
}

module.exports = bookController;
