import { TComment } from '../types'

export type ReactionForm = {
  commentId: string
  emoji: string
  count: number
}

export type CommentDto = TComment
