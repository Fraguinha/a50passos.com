// Imports
import dotenv from 'dotenv';
import express from 'express';
import bodyparser from './lib/setup/bodyparser';
import database from "./lib/setup/database";
import filesystem from './lib/setup/filesystem';
import passport from "./lib/setup/passport";
import routes from './lib/setup/routes';
import viewengine from "./lib/setup/viewengine";

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

// Database
database.start(DATABASE);

// Filesystem
filesystem.configure();

// BodyParser config
bodyparser.configure(app);

// Passport config
passport.configure(app, SECRET);

// Views
viewengine.configure(app);

// Routers
routes.configure(app);

// Start server
app.listen(PORT, () => console.log(`Started listening on port ${PORT}`));
