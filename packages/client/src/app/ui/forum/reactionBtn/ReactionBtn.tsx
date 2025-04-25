import styles from '../addReaction/add-reaction.module.pcss'
import { FC } from 'react'
import { IEmoji } from '../types'
import { EMOJI_LIST } from '../../../../entities/forum/constants'

interface ReactionBtnProps {
  reaction?: {
    emoji: string
    count?: number
  }
  emoji?: IEmoji
  onClickEmoji: (val: IEmoji) => void
}

const ReactionBtn: FC<ReactionBtnProps> = ({
  reaction,
  emoji,
  onClickEmoji,
}) => {
  const isReaction = !!reaction?.emoji
  let emojiObj = emoji
  if (isReaction) {
    emojiObj = EMOJI_LIST.find((em) => em.type === reaction.emoji)
  }

  return emojiObj ? (
    <div>
      <button
        type="button"
        className={styles.button}
        onClick={() => onClickEmoji(emojiObj)}
      >
        <img width="18" height="18" src={emojiObj.icon} alt={emojiObj.type} />
        {reaction?.count ? (
          <span className={styles.buttonCount}>{reaction.count}</span>
        ) : null}
      </button>
    </div>
  ) : null
}

export default ReactionBtn
