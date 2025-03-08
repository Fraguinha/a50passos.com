import express from 'express'
import House from '../../models/house-model.js'
import TemporaryPhoto from '../../models/temporary-photo-model.js'

const router = express.Router()

router.get('/temporary/:index', async (req, res) => {
  const index = parseInt(req.params.index) - 1
  const temporaryPhotos = await TemporaryPhoto.find().exec()
  if (temporaryPhotos && temporaryPhotos[index]) {
    res.contentType(temporaryPhotos[index].contentType)
    res.send(temporaryPhotos[index].data)
  } else {
    res.status(404).end()
  }
})

router.get('/house/:id/:index', async (req, res) => {
  const index = parseInt(req.params.index) - 1
  const house = await House.findOne({ id: req.params.id }).exec()
  if (house && house.images && house.images[index]) {
    res.contentType(house.images[index].contentType)
    res.send(house.images[index].data)
  } else {
    res.status(404).end()
  }
})

export default router
