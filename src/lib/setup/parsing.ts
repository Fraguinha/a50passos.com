import express, { Express } from 'express'

// Functions
const configure = (app: Express) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
}

export = { configure }
