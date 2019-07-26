// Requires
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Models
const User = require('../../models/user')

// Env variables
const appname = process.env.APPNAME || 'app'
const database = process.env.DATABASE || `mongodb://localhost/${appname}`

// Functions
const setupDefaultAdmin = () => {
  User.find((err, res) => {
    if (err) console.err(err)
    if (res.length === 0) {
      const defaultAdmin = new User({
        email: 'admin@admin',
        password: 'admin'
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return console.error(err)
        bcrypt.hash(defaultAdmin.password, salt, (err, hash) => {
          if (err) return console.error(err)
          defaultAdmin.password = hash
          defaultAdmin.save()
        })
      })
    }
  })
}

const startup = () => {
  mongoose.connect(database, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).catch((err) => console.error(err))
  const db = mongoose.connection
  db.on('open', () => {
    console.log('Connected to database')
    setupDefaultAdmin()
  })
}

module.exports = { startup: startup }
