import express from 'express'
import passport from 'passport'
import rateLimiter from '../lib/rate-limit-middleware.js'

const router = express.Router()

// Show login
router.get('/', rateLimiter, (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).redirect('/')
  } else {
    res.render('main/login.ejs', {
      title: 'Página de Login',
      description: '',
      authenticated: req.isAuthenticated(),
    })
  }
})

// Handle login
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next)
})

// Logout
router.post('/logout', (req, res) => {
  req.logout((_err) => { })
  res.redirect('/')
})

export default router
