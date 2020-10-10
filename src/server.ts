// Imports
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import database from "./lib/setup/database";
import passport from "./lib/setup/passport";
import viewengine from "./lib/setup/viewengine";
import catalog from "./routes/catalog";
import dashboard from "./routes/dashboard";
import house from "./routes/house";
import index from "./routes/index";
import login from "./routes/login";

// Dotenv config
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Environment variables
const PORT = process.env.PORT || 3000;
const APPNAME = process.env.APPNAME || "app";
const SECRET = process.env.SESSION_SECRET || "secret";
const DATABASE = process.env.DATABASE || `mongodb://localhost/${APPNAME}`;

// Application
const app = express();

// Express bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
passport.configure(app, SECRET);

// Filesystem
if (!fs.existsSync("./public/uploads/")) {
  fs.mkdirSync("./public/uploads/");
}

// Database
database.startup(APPNAME, DATABASE);

// Views
viewengine.configure(app);

// Routers
app.use("/", index);

app.use("/catalog", catalog);
app.use("/house", house);
app.use("/login", login);
app.use("/dashboard", dashboard);

// Not found
app.get("/*", (req, res) => {
  res.render("main/error.ejs", {
    error: 404,
    description: "A página solicitada não foi encontrada."
  });
});

// Start server
app.listen(PORT, () => console.log(`Started listening on port ${PORT}`));
