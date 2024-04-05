import compression from 'compression'
import { Express } from 'express'

// Functions
const configure = (app: Express) => {
  app.use(compression())
}

export default { configure }
