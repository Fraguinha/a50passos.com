import express from 'express'
import passport from 'passport'

const router = express.Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next)
})

router.post('/logout', (req, res) => {
  req.logout((_err) => {})
  res.redirect('/')
})

export default router
