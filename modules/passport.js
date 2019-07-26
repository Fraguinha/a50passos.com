const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const configure = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, "Invalid");
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) console.error(err);
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
}

module.exports = { configure: configure }
