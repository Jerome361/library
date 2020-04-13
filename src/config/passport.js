const passport = require('passport')

require('./startegies/strategy.local')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize())
  app.use(passport.session());

  // Store user in a session
  passport.serializeUser((user, done)=>{
    done(null, user)
  })
  //Retrieve user from session
  passport.deserializeUser((user, done)=>{
    done(null, user)
  })
}