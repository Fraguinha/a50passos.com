import express from 'express';
import passport from 'passport';

const router = express.Router();

// Show login
router.get('/', (req, res) => {
  res.render('main/login.ejs', {
    title: 'Página de Login',
    description: ''
  });
});

// Handle login
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })(req, res, next);
});

// Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export = router;
