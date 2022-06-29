import express from 'express'
import passport from 'passport'

const router = express.Router()

// Show login
router.get('/', (req, res) => {
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
  req.logout((err) => { })
  res.redirect('/')
})

export = router
