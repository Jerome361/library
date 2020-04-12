const express = require('express');
const { MongoClient } = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      console.log(req.body);
      // Create user, log them in and take them to a page;
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
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
