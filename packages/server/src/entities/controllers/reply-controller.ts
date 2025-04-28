import { Reply } from '../../../db'
import { Op } from 'sequelize'

export type CreateReplyPayload = {
  text: string
  nickname: string
  date: string
  commentId: string
}

export type GetRepliesPayload = {
  commentId: string
}

export async function createReply(payload: CreateReplyPayload) {
  return Reply.create(payload)
}

export async function getReply(payload: GetRepliesPayload) {
  return Reply.findAll({
    where: {
      commentId: {
        [Op.eq]: payload.commentId,
      },
    },
  })
}
