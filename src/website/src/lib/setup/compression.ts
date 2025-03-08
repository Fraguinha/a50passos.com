import compression from 'compression'
import { Express } from 'express'

const configure = (app: Express) => {
  app.use(compression())
}

export default { configure }
