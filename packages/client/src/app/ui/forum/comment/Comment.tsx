import { FC, ReactNode } from 'react'
import styles from './comment.module.pcss'
import AddReaction from '../addReaction/AddReaction'
import { IEmoji, Reaction } from '../types'
import ReactionBtn from '../reactionBtn/ReactionBtn'

interface CommentProps {
  avatar: ReactNode
  title: ReactNode
  description: ReactNode
  reactions: Reaction[]
}

const Comment: FC<CommentProps> = ({
  title,
  description,
  avatar,
  reactions,
}) => {
  const onClickReaction = (emoji: IEmoji) => {
    //Здесь будет логика отправки асинхронного экшена
    console.log('onClickReaction', emoji)
  }
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{description}</p>
        <div className={styles.reactions}>
          {reactions.map((reaction, idx) => (
            <ReactionBtn
              key={reaction.emoji + idx}
              reaction={reaction}
              onClickEmoji={onClickReaction}
            />
          ))}
          <AddReaction />
        </div>
      </div>
    </div>
  )
}

export default Comment
