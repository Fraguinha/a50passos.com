import mongoose from 'mongoose'

const temporaryPhotoSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
})

interface TemporaryPhotoDoc extends mongoose.Document {
  data: Buffer
  contentType: string
}

export default mongoose.model<TemporaryPhotoDoc>('TemporaryPhoto', temporaryPhotoSchema)
