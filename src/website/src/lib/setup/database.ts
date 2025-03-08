import mongoose from 'mongoose'
import Meta from '../../models/meta-model.js'

const seedDatabase = async () => {
  try {
    const count = await Meta.countDocuments()
    if (count === 0) {
      await Meta.create({ managed: 0 })
      console.log('Database seeded with initial metadata')
    }
  } catch (err) {
    console.error('Error seeding database:', err)
  }
}

const connect = (database: string) => {
  mongoose.set('strictQuery', false)
  mongoose.connect(database).catch((err: any) => {
    console.error(err)
    process.exit(1)
  })
  const db = mongoose.connection
  db.on('open', () => {
    console.log('Connected to database')
    seedDatabase()
  })
}

export default { connect }
