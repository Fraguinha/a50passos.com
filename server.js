// Requires
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const User = require("./models/user");

// Dotenv config
require("dotenv").config();

// Passport config
require("./config/passport")(passport);

// Application
const app = express();

// Express bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
secret = process.env.SESSION_SECRET || "secret";
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Views
app.use(express.static("public"));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("layout", "layouts/default");

// Database
database = process.env.DATABASE || "mongodb://localhost/a50passos";
mongoose.connect(database, { useNewUrlParser: true }).catch(err => console.error(err));
const db = mongoose.connection;
db.on('open', () => {
    console.log("Connected to database");
    // Setup default admin
    User.find((err, res) => {
        if (err) return console.log(err)
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
});

// Filesystem
if (!fs.existsSync("public/uploads/")) {
    fs.mkdirSync("public/uploads/");
}

// Routers
app.use("/", require("./routes/index"));

app.use("/catalog", require("./routes/catalog"));
app.use("/house", require("./routes/house"));
app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/*", (req, res) => {
    res.write("Page not found.");
    res.status(404).end();
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Started listening on port ${port}`));
