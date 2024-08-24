// Requires
import { Request, Response } from 'express'

// Functions
const authenticator = (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export default authenticator
