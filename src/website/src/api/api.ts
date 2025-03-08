import express from 'express'
import admin from './routes/admin.js'
import auth from './routes/auth.js'
import images from './routes/images.js'

const router = express.Router()

router.use('/admin', admin)
router.use('/auth', auth)
router.use('/images', images)

export default router
