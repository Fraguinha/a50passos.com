import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
}, { _id: false })

const houseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  wc: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  suite: {
    type: Boolean,
    required: true,
  },
  elevator: {
    type: Boolean,
    required: true,
  },
  dinningroom: {
    type: Boolean,
    required: true,
  },
  balcony: {
    type: Boolean,
    required: true,
  },
  gardin: {
    type: Boolean,
    required: true,
  },
  photos: {
    type: Number,
    required: true,
  },
  images: {
    type: [imageSchema],
    required: true,
    default: [],
  },
  date: {
    type: Number,
    required: true,
    index: true,
  },
})

interface ImageDoc {
  data: Buffer
  contentType: string
}

interface HouseDoc extends mongoose.Document {
  id: string
  type: number
  tip: string
  title: string
  address: string
  description: string
  wc: number
  available: boolean
  suite: boolean
  elevator: boolean
  dinningroom: boolean
  balcony: boolean
  gardin: boolean
  photos: number
  images: ImageDoc[]
  date: number
}

export default mongoose.model<HouseDoc>('House', houseSchema)
