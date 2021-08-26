// Requires
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../../models/user-model'

// Functions
const start = (database: string) => {
  mongoose
    .connect(database, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((_) => {
      process.exit(1)
    })
  const db = mongoose.connection
  db.on('open', () => {
    console.log('Connected to database')
    User.find((_, res) => {
      if (res.length === 0) {
        const defaultAdmin = new User({
          email: 'admin@admin',
          password: 'admin',
        })
        bcrypt.genSalt(10, (_, salt) => {
          bcrypt.hash(defaultAdmin.password, salt, (_, hash) => {
            defaultAdmin.password = hash
            defaultAdmin.save()
          })
        })
      }
    })
  })
}

export = { start }
