import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cookieParser from 'cookie-parser'
import createCommentRoutes from '../routes/topic-route'
import createTopicRoutes from '../routes/topic-route'
import createReplyRoutes from '../routes/reply-route'

export const isAuthenticatedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies?.authCookie

  if (cookie) {
    next()
  } else {
    res.status(403).end('Please login to access this resource')
  }
}

function createServer(app: Express) {
  app.use(
    '/my-api',
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser()
  )

  createTopicRoutes(app)
  createCommentRoutes(app)
  createReplyRoutes(app)
}

export default createServer
