import { useEffect, useRef, useState } from 'react'
import styles from './add-reaction.module.pcss'
import EmojiPicker from '../emojiPicker/EmojiPicker'
import AddEmojiSvg from '../../../../assets/emoji/add_emoji.svg?react'
import { FC } from 'react'
import { IEmoji } from '../../../../entities/forum/types'

interface AddReactionProps {
  onSelectReaction: (val: IEmoji) => void
}

const AddReaction: FC<AddReactionProps> = ({ onSelectReaction }) => {
  const [isOpenPanelEmoji, setIsOpenPanelEmoji] = useState(false)
  const addReactionBtnRef = useRef<HTMLDivElement | null>(null)

  const onSelectEmoji = (emoji: IEmoji) => {
    onSelectReaction(emoji)
    setIsOpenPanelEmoji(false)
  }

  useEffect(() => {
    const onClickOutside = (evt: MouseEvent) => {
      const el = evt.target as HTMLElement
      const closestElId = el.closest('#add-reaction-btn')?.getAttribute('id')

      if (closestElId !== addReactionBtnRef.current?.id) {
        setIsOpenPanelEmoji(false)
      }
    }

    window.addEventListener('click', onClickOutside)

    return () => window.removeEventListener('click', onClickOutside)
  }, [])

  return (
    <div id="add-reaction-btn" ref={addReactionBtnRef}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpenPanelEmoji((prev) => !prev)}
      >
        <div>
          <AddEmojiSvg className={styles.buttonIcon} width="18" height="18" />
        </div>
      </button>

      {isOpenPanelEmoji && <EmojiPicker onSelectEmoji={onSelectEmoji} />}
    </div>
  )
}

export default AddReaction
