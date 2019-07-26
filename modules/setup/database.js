// Requires
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("../../models/user");

// Env variables
database = process.env.DATABASE || "mongodb://localhost/a50passos";

// Functions
const setupDefaultAdmin = () => {
    User.find((err, res) => {
        if (res.length == 0) {
            const default_admin = new User({
                email: "admin@admin",
                password: "admin"
            });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return console.error(err);
                bcrypt.hash(default_admin.password, salt, (err, hash) => {
                    if (err) return console.error(err)
                    default_admin.password = hash
                    default_admin.save()
                });
            });
        }
    });
}

const startup = () => {
    mongoose.connect(database, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).catch(err => console.error(err));
    const db = mongoose.connection;
    db.on('open', () => {
        console.log("Connected to database");
        setupDefaultAdmin();
    });
}

module.exports = { startup: startup }
