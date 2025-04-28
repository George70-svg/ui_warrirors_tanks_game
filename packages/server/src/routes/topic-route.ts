import type { Express } from 'express'
import topic from '../entities/endpoints/topic-endpoint'
import { isAuthenticatedUser } from '../app/server'

function createTopicRoutes(app: Express) {
  app.post('/my-api/topic', isAuthenticatedUser, topic.addTopic)
  app.get('/my-api/topic', isAuthenticatedUser, topic.getAllTopics)
  app.get('/my-api/topic/by-id', isAuthenticatedUser, topic.getTopic)
}

export default createTopicRoutes
