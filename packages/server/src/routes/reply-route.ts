import type { Express } from 'express'
import reply from '../entities/endpoints/reply-endpoint'
import { isAuthenticatedUser } from '../app/server'

function createReplyRoutes(app: Express) {
  app.post('/my-api/reply', isAuthenticatedUser, reply.addReplyForComment)
  app.get('/my-api/reply', isAuthenticatedUser, reply.getAllRepliesFromComments)
}

export default createReplyRoutes
