import type express from 'express'
import {
  createReply,
  CreateReplyPayload,
  getReply,
  GetRepliesPayload,
} from '../controllers/reply-controller'

async function addReplyForComment(req: express.Request, res: express.Response) {
  const body = req.body as CreateReplyPayload
  const reply = await createReply(body)
  res.status(200).json(reply)
}

async function getAllRepliesFromComments(
  req: express.Request,
  res: express.Response
) {
  const payload = req.query as GetRepliesPayload
  const replies = await getReply(payload)
  res.status(200).json(replies)
}

export default {
  addReplyForComment,
  getAllRepliesFromComments,
}
