import express from 'express'
import Meta from '../models/meta-model'

const router = express.Router()

// Show homepage
router.get('/', async (req, res) => {
  const meta = await Meta.findOne().exec()
  res.render('index.ejs', {
    title: 'Quartos e Apartamentos para Arrendar no Polo Universitário do Porto',
    description:
      'És estudante? Estás à procura de arrendar no Porto? Seja qual for a Universidade temos um espaço a 50 passos!',
    authenticated: req.isAuthenticated(),
    meta,
  })
})

export = router
