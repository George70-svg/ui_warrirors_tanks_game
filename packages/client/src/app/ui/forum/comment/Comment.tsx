import { FC } from 'react'
import styles from './comment.module.pcss'
import AddReaction from '../addReaction/AddReaction'
import ReactionBtn from '../reactionBtn/ReactionBtn'
import { TComment, TReaction } from '../../../../entities/forum/types'
import { Avatar } from 'antd'
import { ReactionForm } from '../../../../entities/forum/api/types'

interface CommentProps {
  comment: TComment
  onClickReaction: (data: ReactionForm) => void
  onSelectReaction: (data: ReactionForm) => void
}

const Comment: FC<CommentProps> = ({
  comment: { id, avatar, author, content, reactions },
  onClickReaction,
  onSelectReaction,
}) => {
  const formattedClickReaction = (reaction: TReaction) => {
    const payload: ReactionForm = {
      commentId: String(id),
      emoji: reaction.emoji,
      count: 1,
    }
    onClickReaction(payload)
  }
  const formattedSelectReaction = (reaction: TReaction) => {
    const payload: ReactionForm = {
      commentId: String(id),
      emoji: reaction.emoji,
      count: 1,
    }
    onSelectReaction(payload)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <Avatar src={avatar} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{author}</h4>
        <p className={styles.desc}>{content}</p>
        <div className={styles.reactions}>
          {reactions.map((reaction, idx) => (
            <ReactionBtn
              key={reaction.emoji + idx}
              reaction={reaction}
              onClickEmoji={formattedClickReaction}
            />
          ))}
          <AddReaction onSelectReaction={formattedSelectReaction} />
        </div>
      </div>
    </div>
  )
}

export default Comment
