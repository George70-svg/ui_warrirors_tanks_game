import { Comment } from '../../../db'
import { Op } from 'sequelize'

export type CreateCommentPayload = {
  text: string
  nickname: string
  date: string
  topicId: string
}

export type GetCommentsPayload = {
  topicId: string
}

export async function createComment(payload: CreateCommentPayload) {
  return Comment.create(payload)
}

export async function getComments(payload: GetCommentsPayload) {
  return Comment.findAll({
    where: {
      topicId: {
        [Op.eq]: payload.topicId,
      },
    },
  })
}
