import styles from './emoji-picker.module.pcss'
import ReactionBtn from '../reactionBtn/ReactionBtn'
import { EMOJI_LIST } from '../../../../entities/forum/constants'
import { IEmoji } from '../types'
import { FC } from 'react'

interface EmojiPickerProps {
  onSelectEmoji: (emoji: IEmoji) => void
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onSelectEmoji }) => {
  return (
    <div className={styles.dropdown}>
      {EMOJI_LIST.map((emoji) => (
        <ReactionBtn
          key={emoji.type}
          emoji={emoji}
          onClickEmoji={onSelectEmoji}
        />
      ))}
    </div>
  )
}

export default EmojiPicker
