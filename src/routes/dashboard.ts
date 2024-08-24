import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import authenticator from '../lib/authentication-middleware.js'
import rateLimiter from '../lib/rate-limit-middleware.js'
import House from '../models/house-model.js'
import Meta from '../models/meta-model.js'

const router = express.Router()

const base = 'dist'

// Show dashboard
router.get('/', authenticator, (req, res) => {
  let num_photos = fs.readdirSync(path.join(base, '/public/uploads')).length

  res.render('main/dashboard.ejs', {
    title: 'Dashboard de Administração',
    description: '',
    authenticated: req.isAuthenticated(),
    num_photos: num_photos,
  })
})

router.post('/', rateLimiter, authenticator, (req, res) => {
  let num_photos = fs.readdirSync(path.join(base, '/public/uploads')).length

  res.render('main/dashboard.ejs', {
    title: 'Dashboard de Administração',
    description: '',
    authenticated: req.isAuthenticated(),
    num_photos: num_photos,
  })
})

// Dashboard addPhotos
router.post('/addPhotos', rateLimiter, authenticator, async (req, res) => {
  let photoCounter = 1

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(base, '/public/uploads'))
    },
    filename: (_req, _file, cb) => {
      cb(null, `photo${photoCounter++}.jpg`)
    },
  })

  const upload = multer({ storage: storage })

  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(500).redirect('/dashboard')
    }
    res.status(201).redirect('/dashboard')
  })
})

// Dashboard clearImages
router.post('/clearImages', rateLimiter, authenticator, async (_req, res) => {
  fs.readdir(path.join(base, '/public/uploads'), (_err, files) => {
    for (const file of files) {
      fs.unlinkSync(path.join(base, '/public/uploads', file))
    }

    let photoCounter = 1

    res.status(200).redirect('/dashboard')
  })
})

// Dashboard addHouse
router.post('/addHouse', rateLimiter, authenticator, async (req, res) => {
  let num_photos = fs.readdirSync(path.join(base, '/public/uploads')).length

  if (num_photos >= 1) {
    let id = req.body.id
    if (!id) {
      id = Date.now()
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
      photos: num_photos,
    })
    fs.mkdirSync(path.join(base, '/public/images/', id))
    const files = fs.readdirSync(path.join(base, '/public/uploads'))
    for (const file of files) {
      fs.renameSync(
        path.join(base, '/public/uploads', file),
        path.join(base, '/public/images/', id, file)
      )
    }
    await house.save()

    res.redirect('/dashboard')
  } else {
    res.redirect('/dashboard')
  }
})

// Dashboard toggleHouse
router.post('/toggleHouse', rateLimiter, authenticator, async (req, res) => {
  const house = await House.findOne({ id: req.body.id }).exec()
  if (house != null) {
    if (house.available) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { available: false },
        { upsert: true }
      ).exec()
    } else {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { available: true, date: Date.now() },
        { upsert: true }
      ).exec()
    }
    await house.save()
  }
  res.redirect('/house/' + req.body.id)
})

// Dashboard setNumer
router.post('/setNumber', rateLimiter, authenticator, async (req, res) => {
  const meta = await Meta.findOne().exec()
  if (meta != null) {
    await Meta.findOneAndUpdate(
      {},
      { managed: req.body.number },
      { upsert: true }
    ).exec()
    await meta.save()
  }
  res.redirect('/')
})

// Dashboard removeHouse
router.post('/removeHouse', rateLimiter, authenticator, async (req, res) => {
  const directory = path
    .join(base, '/public/images/', req.body.id)
    .replace(/^(\.\.(\/|\\|$))+/, '')

  await House.deleteOne({ id: req.body.id }).exec()

  const files = fs.readdirSync(directory)
  for (const file of files) {
    fs.unlinkSync(path.join(directory, file))
  }
  fs.rmdirSync(directory)

  res.redirect('/')
})

// Dashboard editHouse
router.post('/editHouse', rateLimiter, authenticator, async (req, res) => {
  const house = await House.findOne({ id: req.body.id }).exec()
  if (house != null) {
    if (req.body.title) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { title: req.body.title },
        { upsert: true }
      ).exec()
    }
    if (req.body.address) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { address: req.body.address },
        { upsert: true }
      ).exec()
    }
    if (req.body.description) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { description: req.body.description },
        { upsert: true }
      ).exec()
    }
    if (req.body.tip) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { tip: req.body.tip },
        { upsert: true }
      ).exec()
    }
    if (req.body.wc) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { wc: req.body.wc },
        { upsert: true }
      ).exec()
    }
    if (req.body.checkbox) {
      await House.findOneAndUpdate(
        { id: req.body.id },
        { suite: !!req.body.suite },
        { upsert: true }
      ).exec()
      await House.findOneAndUpdate(
        { id: req.body.id },
        { elevator: !!req.body.elevator },
        { upsert: true }
      ).exec()
      await House.findOneAndUpdate(
        { id: req.body.id },
        { dinningroom: !!req.body.dinningroom },
        { upsert: true }
      ).exec()
      await House.findOneAndUpdate(
        { id: req.body.id },
        { balcony: !!req.body.balcony },
        { upsert: true }
      ).exec()
      await House.findOneAndUpdate(
        { id: req.body.id },
        { gardin: !!req.body.gardin },
        { upsert: true }
      ).exec()
    }
    await house.save()
  }
  res.redirect('/house/' + req.body.id)
})

export default router
