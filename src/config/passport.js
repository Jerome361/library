const passport = require('passport')
require('../routes/strategies/local.strategy')

module.export = function passpotConfig(app) {
  app.use(passport.initialise())
  app.use(passport.session())

  //Store user in session
  passport.serialiseUser((user, done) => {
    done(null, user)
  })

  //Retrieves user from session
  passport.deserialiseUser((userId, done) => {
    done(null, userId);
  })
}