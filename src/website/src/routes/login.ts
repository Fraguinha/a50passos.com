import express from 'express'
import rateLimiter from '../lib/middleware/rate-limiter.js'

const router = express.Router()

router.get('/', rateLimiter, (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).redirect('/')
  } else {
    res.render('pages/login/login.ejs', {
      title: 'Página de Login',
      description: '',
      authenticated: req.isAuthenticated(),
    })
  }
})

export default router
