// Requires
import mongoose from 'mongoose'

// Functions
const start = (database: string) => {
  mongoose.set('strictQuery', false)
  mongoose.connect(database).catch((_) => {
    process.exit(1)
  })
  const db = mongoose.connection
  db.on('open', () => {
    console.log('Connected to database')
  })
}

export = { start }
