import { Express } from 'express'
import api from '../../api/api.js'
import catalog from '../../routes/catalog.js'
import homepage from '../../routes/homepage.js'
import house from '../../routes/house.js'
import image from '../../routes/image.js'
import login from '../../routes/login.js'

const configure = (app: Express) => {
  app.use('/', homepage)
  app.use('/api', api)
  app.use('/catalog', catalog)
  app.use('/house', house)
  app.use('/image', image)
  app.use('/login', login)

  app.use((_req, res) => {
    res.status(404).render('pages/error/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    })
  })
}

export default { configure }
