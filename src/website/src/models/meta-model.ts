import mongoose from 'mongoose'

const metaSchema = new mongoose.Schema({
  managed: {
    type: Number,
    required: true,
  },
})

interface MetaDoc extends mongoose.Document {
  managed: number
}

export default mongoose.model<MetaDoc>('Meta', metaSchema)
