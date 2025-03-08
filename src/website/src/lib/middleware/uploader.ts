import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { maxFileSize } from '../constants/constants.js'

const storage = multer.memoryStorage()

const filter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true)
  } else {
    cb(new Error())
  }
}

const uploader = multer({
  storage,
  fileFilter: filter,
  limits: {
    files: 50,
    fileSize: maxFileSize,
    parts: 100
  },
})

export default uploader
