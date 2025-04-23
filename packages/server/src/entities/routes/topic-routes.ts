import type express from 'express'
import {
  createTopic,
  getTopicById,
  getTopics,
  CreateTopicPayload,
  GetTopicByIdPayload,
} from '../controllers/topic-controller'

async function addTopic(req: express.Request, res: express.Response) {
  const body = req.body as CreateTopicPayload
  const topic = await createTopic(body)
  res.status(200).json(topic)
}

async function getAllTopics(_: express.Request, res: express.Response) {
  const topics = await getTopics()
  res.status(200).json(topics)
}

async function getTopic(req: express.Request, res: express.Response) {
  const payload = req.query as GetTopicByIdPayload
  const topic = await getTopicById(payload)
  res.status(200).json(topic)
}

export default {
  addTopic,
  getAllTopics,
  getTopic,
}
