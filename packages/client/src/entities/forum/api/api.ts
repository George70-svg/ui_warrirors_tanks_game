import { ConfigFacade } from '../../../shared/api'
import { CommentDto } from './types'

export const apiParams = {
  addReaction: (data: CommentDto): ConfigFacade => ({
    url: '/forum/comment/reaction',
    data,
    method: 'POST',
  }),
}
