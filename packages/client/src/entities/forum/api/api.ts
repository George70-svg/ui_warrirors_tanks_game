import { ConfigFacade } from '../../../shared/api'
import { ReactionForm } from './types'

export const apiParams = {
  addReaction: (data: ReactionForm): ConfigFacade => ({
    url: '/forum/comment/reaction',
    data,
    method: 'POST',
  }),
}
