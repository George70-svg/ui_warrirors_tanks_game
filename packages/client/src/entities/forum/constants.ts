import LikePng from '../../assets/emoji/like.png'
import DislikePng from '../../assets/emoji/dislike.png'
import { IEmoji } from '../../app/ui/forum/types'

export const EMOJI_LIST: IEmoji[] = [
  {
    type: 'like',
    native: '👍',
    icon: LikePng,
  },
  {
    type: 'dislike',
    native: '👎',
    icon: DislikePng,
  },
]
