import express from 'express'
import rateLimiter from '../lib/middleware/rate-limiter.js'

const router = express.Router()

router.get('/:id/:number', rateLimiter, async (req, res) => {
  res.render('pages/image/image.ejs', {
    title: 'Photo ' + req.params.number,
    description: '',
    authenticated: req.isAuthenticated(),
    id: req.params.id,
    number: req.params.number,
  })
})

export default router
