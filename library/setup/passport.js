// Requires
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

// Models
const User = require("../../models/user-model");

// Env variables
const secret = process.env.SESSION_SECRET || "secret";

// Functions
const setup = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, "Invalid");
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "Invalid");
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

const configure = app => {
  // Cookie session
  app.use(cookieSession({ secret: secret }));
  // Passport
  setup(passport);
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = { configure: configure };
