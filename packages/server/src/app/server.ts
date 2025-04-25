import topic from '../entities/routes/topic-routes'
import comment from '../entities/routes/comment-routes'
import reply from '../entities/routes/reply-routes'
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cookieParser from 'cookie-parser'

function createServer(app: Express) {
  const routes = {
    topic: topic,
    comment: comment,
    reply: reply,
  }

  const isAuthenticatedUser = (
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

  app.use(
    '/my-api',
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser()
  )

  app.post('/my-api/topic', isAuthenticatedUser, routes.topic.addTopic)
  app.get('/my-api/topic', isAuthenticatedUser, routes.topic.getAllTopics)
  app.get('/my-api/topic/by-id', isAuthenticatedUser, routes.topic.getTopic)

  app.post(
    '/my-api/comment',
    isAuthenticatedUser,
    routes.comment.addCommentForTopic
  )
  app.get(
    '/my-api/comment',
    isAuthenticatedUser,
    routes.comment.getAllCommentsFromTopic
  )

  app.post(
    '/my-api/reply',
    isAuthenticatedUser,
    routes.reply.addReplyForComment
  )
  app.get(
    '/my-api/reply',
    isAuthenticatedUser,
    routes.reply.getAllRepliesFromComments
  )
}

export default createServer
