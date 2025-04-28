import type express from 'express'
import {
  createComment,
  getComments,
  CreateCommentPayload,
  GetCommentsPayload,
} from '../controllers/comment-controller'

async function addCommentForTopic(req: express.Request, res: express.Response) {
  const body = req.body as CreateCommentPayload
  const comment = await createComment(body)
  res.status(200).json(comment)
}

async function getAllCommentsFromTopic(
  req: express.Request,
  res: express.Response
) {
  const payload = req.query as GetCommentsPayload
  const comments = await getComments(payload)
  res.status(200).json(comments)
}

export default {
  addCommentForTopic,
  getAllCommentsFromTopic,
}
