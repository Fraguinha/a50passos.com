import express, { Express } from 'express'

const configure = (app: Express) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
}

export default { configure }
