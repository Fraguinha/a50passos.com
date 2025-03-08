import express from 'express'
import authentication from './lib/setup/authentication.js'
import compression from './lib/setup/compression.js'
import database from './lib/setup/database.js'
import parser from './lib/setup/parser.js'
import routes from './lib/setup/routes.js'
import viewengine from './lib/setup/viewengine.js'

const PORT = process.env.PORT ?? 8080
const APPNAME = process.env.APPNAME ?? 'a50passos'
const SECRET = process.env.SESSION_SECRET ?? 'secret'
const DATABASE = process.env.DATABASE ?? `mongodb://localhost/${APPNAME}`

const app = express()

database.connect(DATABASE)

parser.configure(app)

compression.configure(app)

authentication.configure(app, SECRET, DATABASE)

viewengine.configure(app)

routes.configure(app)

app.listen(PORT, () => console.log(`Started listening on port ${PORT}`))
