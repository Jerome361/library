/* eslint-disable linebreak-style */
const express = require('express');
const { MongoClient } = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017/myLibraryApp';

      //Save user to the database 
      (async function mongo() {
        let client;
        try {
          // Connecting to the server
          client = await MongoClient.connect(url);
          console.log('Server connection successful');

          // Create a new database instance
          const db = client.db();

          // Create a collection instance and insert books to it.
          const col = await db.collection('users');
          // Create a user instance
          const user = { username, password };
          const results = await col.insertOne(user);
          console.log(results);
          // Create user, log them in and take them to a page;
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          console.err(`Database error ${err}`);
        }
        client.close();
      }());

    });

  // Because I have logged in, passport will take the user, serialise it into the cookie and all
  // that magic for us using local strategy, but when a request is made to /profile,
  // it will attach the user as if by magic to the request;

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
