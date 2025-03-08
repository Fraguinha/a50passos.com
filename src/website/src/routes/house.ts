import express from 'express'
import rateLimiter from '../lib/middleware/rate-limiter.js'
import House from '../models/house-model.js'

const router = express.Router()

router.get('/:id', rateLimiter, async (req, res) => {
  const house = await House.findOne(
    { id: req.params.id },
    'id title address description tip wc available suite elevator dinningroom balcony gardin photos'
  ).exec()
  if (house != null) {
    res.render('pages/house/house.ejs', {
      title: house.title,
      description: house.description,
      authenticated: req.isAuthenticated(),
      data: house,
    })
  } else {
    res.status(404).render('pages/error/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    })
  }
})

export default router
