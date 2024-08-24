import express from 'express'
import rateLimiter from '../lib/rate-limit-middleware.js'

const router = express.Router()

// Show image
router.get('/:id/:number', rateLimiter, async (req, res) => {
  res.render('main/image.ejs', {
    title: 'Photo ' + req.params.number,
    description: '',
    authenticated: req.isAuthenticated(),
    id: req.params.id,
    number: req.params.number,
  })
})

export default router
