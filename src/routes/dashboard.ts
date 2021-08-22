import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import ensureAuthentication from '../lib/middleware'
import House from '../models/house-model'
import Meta from '../models/meta-model'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '/../public/uploads'))
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '.jpg')
  },
})
const upload = multer({ storage })

const base = path.resolve(__dirname, '..')

// Show dashboard
router.get('/', ensureAuthentication, (req, res) => {
  res.render('main/dashboard.ejs', {
    title: 'Dashboard de Administração',
    description: '',
    authenticated: req.isAuthenticated(),
  })
})

// Dashboard addPhotos
router.post(
  '/addPhoto1',
  ensureAuthentication,
  upload.single('photo1'),
  async (req, res) => {
    res.status(201).redirect('/dashboard')
  }
)

router.post(
  '/addPhoto2',
  ensureAuthentication,
  upload.single('photo2'),
  async (req, res) => {
    res.status(201).redirect('/dashboard')
  }
)

router.post(
  '/addPhoto3',
  ensureAuthentication,
  upload.single('photo3'),
  async (req, res) => {
    res.status(201).redirect('/dashboard')
  }
)

router.post(
  '/addPhoto4',
  ensureAuthentication,
  upload.single('photo4'),
  async (req, res) => {
    res.status(201).redirect('/dashboard')
  }
)

// Dashboard clearImages
router.post('/clearImages', ensureAuthentication, async (req, res) => {
  if (fs.existsSync(base + '/public/uploads/photo1.jpg')) {
    fs.unlinkSync(base + '/public/uploads/photo1.jpg')
  }
  if (fs.existsSync(base + '/public/uploads/photo2.jpg')) {
    fs.unlinkSync(base + '/public/uploads/photo2.jpg')
  }
  if (fs.existsSync(base + '/public/uploads/photo3.jpg')) {
    fs.unlinkSync(base + '/public/uploads/photo3.jpg')
  }
  if (fs.existsSync(base + '/public/uploads/photo4.jpg')) {
    fs.unlinkSync(base + '/public/uploads/photo4.jpg')
  }
  res.redirect('/dashboard')
})

// Dashboard addHouse
router.post('/addHouse', ensureAuthentication, async (req, res) => {
  if (
    fs.existsSync(base + '/public/uploads/photo1.jpg') &&
    fs.existsSync(base + '/public/uploads/photo2.jpg') &&
    fs.existsSync(base + '/public/uploads/photo3.jpg') &&
    fs.existsSync(base + '/public/uploads/photo4.jpg')
  ) {
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
      photo1: '/images/' + id + '/photo1.jpg',
      photo2: '/images/' + id + '/photo2.jpg',
      photo3: '/images/' + id + '/photo3.jpg',
      photo4: '/images/' + id + '/photo4.jpg',
    })
    fs.mkdirSync(base + '/public/images/' + id)
    fs.renameSync(
      base + '/public/uploads/photo1.jpg',
      base + '/public/images/' + id + '/photo1.jpg'
    )
    fs.renameSync(
      base + '/public/uploads/photo2.jpg',
      base + '/public/images/' + id + '/photo2.jpg'
    )
    fs.renameSync(
      base + '/public/uploads/photo3.jpg',
      base + '/public/images/' + id + '/photo3.jpg'
    )
    fs.renameSync(
      base + '/public/uploads/photo4.jpg',
      base + '/public/images/' + id + '/photo4.jpg'
    )
    await house.save()
    res.redirect('/dashboard')
  } else {
    res.redirect('/dashboard')
  }
})

// Dashboard toggleHouse
router.post('/toggleHouse', ensureAuthentication, async (req, res) => {
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
router.post('/setNumber', ensureAuthentication, async (req, res) => {
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
router.post('/removeHouse', ensureAuthentication, async (req, res) => {
  await House.deleteOne({ id: req.body.id }).exec()
  fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo1.jpg')
  fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo2.jpg')
  fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo3.jpg')
  fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo4.jpg')
  fs.rmdirSync(base + '/public/images/' + req.body.id)
  res.redirect('/')
})

// Dashboard editHouse
router.post('/editHouse', ensureAuthentication, async (req, res) => {
  const house = await House.findOne().exec()
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
    if (fs.existsSync(base + '/public/uploads/photo1.jpg')) {
      fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo1.jpg')
      fs.renameSync(
        base + '/public/uploads/photo1.jpg',
        base + '/public/images/' + req.body.id + '/photo1.jpg'
      )
    }
    if (fs.existsSync(base + '/public/uploads/photo2.jpg')) {
      fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo2.jpg')
      fs.renameSync(
        base + '/public/uploads/photo2.jpg',
        base + '/public/images/' + req.body.id + '/photo2.jpg'
      )
    }
    if (fs.existsSync(base + '/public/uploads/photo3.jpg')) {
      fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo3.jpg')
      fs.renameSync(
        base + '/public/uploads/photo3.jpg',
        base + '/public/images/' + req.body.id + '/photo3.jpg'
      )
    }
    if (fs.existsSync(base + '/public/uploads/photo4.jpg')) {
      fs.unlinkSync(base + '/public/images/' + req.body.id + '/photo4.jpg')
      fs.renameSync(
        base + '/public/uploads/photo4.jpg',
        base + '/public/images/' + req.body.id + '/photo4.jpg'
      )
    }
    await house.save()
  }
  res.redirect('/dashboard')
})

export = router
