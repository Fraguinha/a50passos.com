// Requires
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");

// Dotenv config
dotenv.config();

// Modules
const passport = require("./library/setup/passport");
const database = require("./library/setup/database");
const viewengine = require("./library/setup/viewengine");

// Application
const app = express();

// Express bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
passport.configure(app);

// Filesystem
if (!fs.existsSync("./public/uploads/")) {
  fs.mkdirSync("./public/uploads/");
}

// Database
database.startup();

// Views
viewengine.configure(app);

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
