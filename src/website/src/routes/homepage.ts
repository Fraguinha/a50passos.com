import express from 'express'
import rateLimiter from '../lib/middleware/rate-limiter.js'
import Meta from '../models/meta-model.js'
import TemporaryPhoto from '../models/temporary-photo-model.js'

const router = express.Router()

router.get('/', rateLimiter, async (req, res) => {
  const meta = await Meta.findOne().exec()
  const num_photos = await TemporaryPhoto.countDocuments()
  res.render('pages/homepage/homepage.ejs', {
    title: 'Quartos e Apartamentos para Arrendar no Porto',
    description:
      'És estudante? Estás à procura de arrendar no Porto? Seja qual for a Universidade temos um espaço a 50 passos!',
    authenticated: req.isAuthenticated(),
    num_photos,
    meta,
  })
})

export default router
