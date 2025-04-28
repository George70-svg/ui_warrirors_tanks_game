import { Topic } from '../../../db'

export type CreateTopicPayload = {
  title: string
}

export type GetTopicByIdPayload = {
  id: string
}

export async function createTopic(payload: CreateTopicPayload) {
  return Topic.create(payload)
}

export async function getTopics() {
  return Topic.findAll()
}

export async function getTopicById(payload: GetTopicByIdPayload) {
  return Topic.findByPk(payload.id)
}
