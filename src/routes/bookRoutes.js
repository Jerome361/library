const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const bookController = require('../controllers/bookController');
const bookService = require('../services/bookService')

function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav, bookService);
  // authorising access to only signed in users;
  bookRouter.use(middleware);
  // Display book catalogue;
  bookRouter.route('/')
    .get(getIndex);

  // Specific book route;
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

// Exports
module.exports = router;
