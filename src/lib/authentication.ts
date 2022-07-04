// Requires
import { Request, Response } from 'express'

// Functions
const ensureAuthentication = (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export = ensureAuthentication
