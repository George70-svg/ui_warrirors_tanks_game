import { useState } from 'react'
import styles from './add-reaction.module.pcss'
import EmojiPicker from '../emojiPicker/EmojiPicker'
import AddEmojiSvg from '../../../../assets/emoji/add_emoji.svg?react'
import { FC } from 'react'
import { TReaction } from '../../../../entities/forum/types'
import { useClickOutside } from '../../../../shared/hooks/useClickOutside'
import { Button } from 'antd'

interface AddReactionProps {
  onSelectReaction: (reaction: TReaction) => void
}

const AddReaction: FC<AddReactionProps> = ({ onSelectReaction }) => {
  const [isOpenPanelEmoji, setIsOpenPanelEmoji] = useState(false)
  const addReactionBtnRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpenPanelEmoji(false)
  })

  const onSelectEmoji = (reaction: TReaction) => {
    onSelectReaction(reaction)
    setIsOpenPanelEmoji(false)
  }

  return (
    <div ref={addReactionBtnRef}>
      <Button
        type="text"
        color="default"
        icon={<AddEmojiSvg />}
        className={styles.button}
        onClick={() => setIsOpenPanelEmoji((prev) => !prev)}
      />

      {isOpenPanelEmoji && <EmojiPicker onSelectEmoji={onSelectEmoji} />}
    </div>
  )
}

export default AddReaction
