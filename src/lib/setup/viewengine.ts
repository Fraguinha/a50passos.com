// Requires
import express, { Express } from 'express'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'

// Functions
const configure = (app: Express) => {
  const base = path.resolve('dist');
  app.use(expressLayouts)
  app.use(express.static(path.join(base, '/public')))
  app.set('views', path.join(base, '/views'))
  app.set('layout', 'layouts/default')
  app.set('view engine', 'ejs')
}

export default { configure }
