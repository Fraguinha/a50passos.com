// Requires
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcryptjs')

// Models
const User = require('../../models/user')

// Env variables
const secret = process.env.SESSION_SECRET || 'secret'

// Functions
const setup = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false, 'Invalid')
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) console.error(err)
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, 'Invalid')
          }
        })
      })
  })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

const configure = (app) => {
  // Express session
  app.use(session({ secret: secret, resave: true, saveUninitialized: true }))
  // Passport
  setup(passport)
  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = { configure: configure }
