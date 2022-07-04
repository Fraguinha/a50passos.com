// Imports
import dotenv from 'dotenv'
import express from 'express'
import compression from './lib/setup/compression'
import database from './lib/setup/database'
import filesystem from './lib/setup/filesystem'
import parsing from './lib/setup/parsing'
import passport from './lib/setup/passport'
import routes from './lib/setup/routes'
import viewengine from './lib/setup/viewengine'

// Dotenv config
dotenv.config()

// Environment variables
const PORT = process.env.PORT || 3000
const APPNAME = process.env.APPNAME || 'a50passos'
const SECRET = process.env.SESSION_SECRET || 'secret'
const DATABASE = process.env.DATABASE || `mongodb://localhost/${APPNAME}`

// Application
const app = express()

// Filesystem
filesystem.configure()

// Database
database.start(DATABASE)

// Parsing
parsing.configure(app)

// Compression
compression.configure(app)

// Passport
passport.configure(app, SECRET)

// Views
viewengine.configure(app)

// Routers
routes.configure(app)

// Start server
app.listen(PORT, () => console.log(`Started listening on port ${PORT}`))
