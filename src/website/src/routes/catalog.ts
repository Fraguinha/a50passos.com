import express from 'express'
import rateLimiter from '../lib/middleware/rate-limiter.js'
import House from '../models/house-model.js'
import {
  APARTMENT,
  numberItems,
  paginationNumber,
  ROOM,
} from '../lib/constants/constants.js'

const router = express.Router()

router.get('/:page', rateLimiter, async (req, res) => {
  const page = Number(req.params.page)
  const houses = await House.find({})
    .select('-images')
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .lean()
    .exec()
  const count = await House.countDocuments().exec()
  const pages = Math.ceil(count / numberItems)
  if (page <= pages) {
    res.render('pages/catalog/catalog.ejs', {
      title: 'Catálogo de Quartos e Apartamentos no Porto',
      description:
        'Consulte a nossa lista de quartos e apartamentos. Descubra um quarto ou apartamento a 50 passos de qualquer universidade.',
      authenticated: req.isAuthenticated(),
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog',
    })
  } else {
    res.status(404).render('pages/error/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    })
  }
})

router.get('/rooms/:page', rateLimiter, async (req, res) => {
  const page = Number(req.params.page)
  const houses = await House.find({ type: ROOM })
    .select('-images')
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .lean()
    .exec()
  const count = await House.countDocuments({ type: ROOM }).exec()
  const pages = Math.ceil(count / numberItems)
  if (page <= pages) {
    res.render('pages/catalog/catalog.ejs', {
      title: 'Catálogo de Quartos no Porto',
      description:
        'Consulte a nossa lista de quartos. Descubra um quarto a 50 passos de qualquer universidade.',
      authenticated: req.isAuthenticated(),
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/rooms',
    })
  } else {
    res.status(404).render('pages/error/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    })
  }
})

router.get('/apartments/:page', rateLimiter, async (req, res) => {
  const page = Number(req.params.page)
  const houses = await House.find({ type: APARTMENT })
    .select('-images')
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .lean()
    .exec()
  const count = await House.countDocuments({ type: APARTMENT }).exec()
  const pages = Math.ceil(count / numberItems)
  if (page <= pages) {
    res.render('pages/catalog/catalog.ejs', {
      title: 'Catálogo de Apartamentos no Porto',
      description:
        'Consulte a nossa lista de apartamentos. Descubra um apartamento a 50 passos de qualquer universidade.',
      authenticated: req.isAuthenticated(),
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/apartments',
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
