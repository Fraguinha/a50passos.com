// Imports
import dotenv from 'dotenv'
import express from 'express'
import compression from './lib/setup/compression.js'
import database from './lib/setup/database.js'
import filesystem from './lib/setup/filesystem.js'
import parser from './lib/setup/parser.js'
import authentication from './lib/setup/authentication.js'
import routes from './lib/setup/routes.js'
import viewengine from './lib/setup/viewengine.js'

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
parser.configure(app)

// Compression
compression.configure(app)

// Authentication
authentication.configure(app, SECRET)

// Views
viewengine.configure(app)

// Routers
routes.configure(app)

// Start server
app.listen(PORT, () => console.log(`Started listening on port ${PORT}`))
