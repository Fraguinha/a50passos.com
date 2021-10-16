import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

interface UserDoc extends mongoose.Document {
  email: string
  password: string
  date: Date
}

export = mongoose.model<UserDoc>('User', userSchema)
