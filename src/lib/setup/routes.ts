import { Express } from 'express'
import catalog from '../../routes/catalog.js'
import dashboard from '../../routes/dashboard.js'
import house from '../../routes/house.js'
import image from '../../routes/image.js'
import index from '../../routes/index.js'
import login from '../../routes/login.js'

// Functions
const configure = (app: Express) => {
  app.use('/', index)
  app.use('/catalog', catalog)
  app.use('/house', house)
  app.use('/image', image)
  app.use('/login', login)
  app.use('/dashboard', dashboard)

  // Not found
  app.use((_req, res) => {
    res.status(404).render('main/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    })
  })
}

export default { configure }
