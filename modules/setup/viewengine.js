// Requires
const expressLayouts = require('express-ejs-layouts')
const express = require('express')

// Functions
const configure = (app) => {
  app.use(expressLayouts)
  app.use(express.static('public'))
  app.set('layout', 'layouts/default')
  app.set('view engine', 'ejs')
}

module.exports = { configure: configure }
