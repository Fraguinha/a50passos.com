import express from 'express'

const router = express.Router()

// Show image
router.get('/:id/:number', async (req, res) => {
  res.render('main/image.ejs', {
    title: 'Photo ' + req.params.number,
    description: '',
    authenticated: req.isAuthenticated(),
    id: req.params.id,
    number: req.params.number,
  })
})

export = router
