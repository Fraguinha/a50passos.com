const express = require('express')
const router = express.Router()
const House = require('../models/house')

// Show catalog
router.get('/', async (req, res) => {
  try {
    const houses = await House.find()
    res.render('catalog.ejs', {
      data: houses
    })
  } catch (err) {
    res.redirect('/')
  }
})

module.exports = router
