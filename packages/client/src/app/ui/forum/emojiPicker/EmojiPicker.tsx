import styles from './emoji-picker.module.pcss'
import ReactionBtn from '../reactionBtn/ReactionBtn'
import { EMOJI_LIST } from '../../../../entities/forum/constants'
import { TReaction } from '../../../../entities/forum/types'
import { FC } from 'react'

interface EmojiPickerProps {
  onSelectEmoji: (reaction: TReaction) => void
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onSelectEmoji }) => {
  return (
    <div className={styles.dropdown}>
      {EMOJI_LIST.map((emoji) => {
        const reaction: TReaction = {
          emoji: emoji.type,
          count: 0,
        }

        return (
          <ReactionBtn
            key={emoji.type}
            reaction={reaction}
            onClickEmoji={onSelectEmoji}
          />
        )
      })}
    </div>
  )
}

export default EmojiPicker
