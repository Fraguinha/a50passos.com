// Requires
import bcrypt from 'bcryptjs'
import cookieSession from 'cookie-session'
import { Express } from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../../models/user-model'

// Functions
const configure = (app: Express, secret: string) => {
  // Cookie session
  app.use(cookieSession({ secret }))
  // Passport
  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: 'email' },
      (email, password, done) => {
        // Match user
        User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, null)
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, null)
            }
          })
        })
      }
    )
  )

  passport.serializeUser((user: any, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id: any, done) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user)
    })
  })

  app.use(passport.initialize())
  app.use(passport.session())
}

export = { configure }
