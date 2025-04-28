import type { Express } from 'express'
import comment from '../entities/endpoints/comment-endpoint'
import { isAuthenticatedUser } from '../app/server'

function createCommentRoutes(app: Express) {
  app.post('/my-api/comment', isAuthenticatedUser, comment.addCommentForTopic)
  app.get(
    '/my-api/comment',
    isAuthenticatedUser,
    comment.getAllCommentsFromTopic
  )
}

export default createCommentRoutes
