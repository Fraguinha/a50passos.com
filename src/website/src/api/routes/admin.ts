import express from 'express'
import authenticator from '../../lib/middleware/authentication.js'
import rateLimiter from '../../lib/middleware/rate-limiter.js'
import {
  imageSizeBig,
  imageSizeSmall,
} from '../../lib/constants/constants.js'
import House from '../../models/house-model.js'
import Meta from '../../models/meta-model.js'
import TemporaryPhoto from '../../models/temporary-photo-model.js'
import sharp from 'sharp'
import uploader from '../../lib/middleware/uploader.js'

const router = express.Router()

router.post('/setManaged', rateLimiter, authenticator, async (req, res) => {
  const meta = await Meta.findOne().exec()

  if (meta != null) {
    await meta.updateOne({ managed: req.body.number }, { upsert: true }).exec()
    await meta.save()
  }

  res.redirect('/')
})

router.post(
  '/addPhotos',
  rateLimiter,
  authenticator,
  uploader.any(),
  async (req, res) => {
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      return res.status(400).redirect('/')
    }

    for (const photo of files) {
      const buffer = await sharp(photo.buffer)
        .resize({
          width: imageSizeBig,
          height: imageSizeSmall,
        })
        .rotate(90)
        .webp({ quality: 80 })
        .toBuffer()

      const temporaryPhoto = new TemporaryPhoto({
        data: buffer,
        contentType: 'image/webp',
      })
      await temporaryPhoto.save()
    }

    res.status(201).redirect('/')
  }
)

router.post('/clearPhotos', rateLimiter, authenticator, async (_req, res) => {
  await TemporaryPhoto.deleteMany({}).exec()
  res.status(200).redirect('/')
})

router.post('/addHouse', rateLimiter, authenticator, async (req, res) => {
  const temporaryPhotos = await TemporaryPhoto.find().exec()

  if (temporaryPhotos.length >= 1) {
    let id = req.body.id

    if (!id) {
      id = Date.now().toString()
    }

    const house = new House({
      date: Date.now(),
      id,
      available: true,
      type: req.body.type,
      tip: req.body.tip ? req.body.tip : '',
      title: req.body.title,
      address: req.body.address,
      description: req.body.description ? req.body.description : '',
      wc: req.body.wc,
      suite: !!req.body.suite,
      elevator: !!req.body.elevator,
      dinningroom: !!req.body.dinningroom,
      balcony: !!req.body.balcony,
      gardin: !!req.body.gardin,
      photos: temporaryPhotos.length,
      images: temporaryPhotos.map((p) => ({
        data: p.data,
        contentType: p.contentType,
      })),
    })

    await house.save()
    await TemporaryPhoto.deleteMany({}).exec()

    res.redirect('/')
  } else {
    res.redirect('/')
  }
})

router.post('/toggleHouse', rateLimiter, authenticator, async (req, res) => {
  const house = await House.findOne({ id: req.body.id }).select('-images').exec()
  if (house != null) {
    if (house.available) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { available: false },
        { upsert: true }
      )
        .select('-images')
        .exec()
    } else {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { available: true, date: Date.now() },
        { upsert: true }
      )
        .select('-images')
        .exec()
    }
    await house.save()
  }
  res.redirect('/house/' + req.body.id)
})

router.post('/removeHouse', rateLimiter, authenticator, async (req, res) => {
  await House.deleteOne({ id: req.body.id }).exec()
  res.redirect('/')
})

router.post('/editHouse', rateLimiter, authenticator, async (req, res) => {
  const house = await House.findOne({ id: req.body.id }).select('-images').exec()
  if (house != null) {
    if (req.body.title) {
      await house.updateOne({ title: req.body.title }, { upsert: true }).exec()
    }

    if (req.body.address) {
      await house
        .updateOne({ address: req.body.address }, { upsert: true })
        .exec()
    }

    if (req.body.description) {
      await house
        .updateOne({ description: req.body.description }, { upsert: true })
        .exec()
    }

    if (req.body.tip) {
      await house.updateOne({ tip: req.body.tip }, { upsert: true }).exec()
    }

    if (req.body.wc) {
      await house.updateOne({ wc: req.body.wc }, { upsert: true }).exec()
    }

    if (req.body.checkbox) {
      await house
        .updateOne(
          {
            suite: !!req.body.suite,
            elevator: !!req.body.elevator,
            dinningroom: !!req.body.dinningroom,
            balcony: !!req.body.balcony,
            gardin: !!req.body.gardin,
          },
          { upsert: true }
        )
        .exec()
    }

    await house.save()
  }
  res.redirect('/house/' + req.body.id)
})

export default router
