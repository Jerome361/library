const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017/myLibraryApp';
      // Save user to the database
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

          // Find user associated with the login
          const user = await col.findOne({ username });
          if (user.password === password) {
            done(null, user); // successRedirect: '/auth/profile'
          } else {
            done(null, false); // failureRedirect: '/'
          }
        } catch (err) {
          console.err(`Database error ${err}`);
        }
        client.close();
      }());
    }
  ));
};
