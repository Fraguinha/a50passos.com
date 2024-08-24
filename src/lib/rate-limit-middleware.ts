// Requires
import { rateLimit } from 'express-rate-limit'

// Functions
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
})

export default rateLimiter
