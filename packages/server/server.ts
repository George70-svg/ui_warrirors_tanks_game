import topic from './src/entities/routes/topic-routes'
import comment from './src/entities/routes/comment-routes'
import reply from './src/entities/routes/reply-routes'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const routes = {
  topic: topic,
  comment: comment,
  reply: reply,
}

const isAuthenticatedUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const cookie = req.cookies?.authCookie

  if (cookie) {
    next()
  } else {
    res.status(403).end('Please login to access this resource')
  }
}

const app = express()
app.use(cors())

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

app.post('/my-api/reply', isAuthenticatedUser, routes.reply.addReplyForComment)
app.get(
  '/my-api/reply',
  isAuthenticatedUser,
  routes.reply.getAllRepliesFromComments
)

export default app
