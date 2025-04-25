import styles from '../addReaction/add-reaction.module.pcss'
import { FC } from 'react'
import { TReaction } from '../../../../entities/forum/types'
import { EMOJI_LIST } from '../../../../entities/forum/constants'

interface ReactionBtnProps {
  reaction: TReaction
  onClickEmoji: (val: TReaction) => void
}

const ReactionBtn: FC<ReactionBtnProps> = ({ reaction, onClickEmoji }) => {
  const emojiObj = EMOJI_LIST.find((em) => em.type === reaction.emoji)

  if (!emojiObj) {
    return
  }

  const reactionEmit: TReaction = {
    ...reaction,
    count: reaction.count + 1,
  }

  return (
    <div>
      <button
        type="button"
        className={styles.button}
        onClick={() => onClickEmoji(reactionEmit)}
      >
        <img width="18" height="18" src={emojiObj.icon} alt={emojiObj.type} />
        {reaction?.count ? (
          <span className={styles.buttonCount}>{reaction.count}</span>
        ) : null}
      </button>
    </div>
  )
}

export default ReactionBtn
