import { useEffect, useRef, useState } from 'react'
import styles from './add-reaction.module.pcss'
import EmojiPicker from '../emojiPicker/EmojiPicker'
import AddEmojiSvg from '../../../../assets/emoji/add_emoji.svg?react'
import { useAppDispatch } from '../../../../shared/lib'
import { addReactionAction } from '../../../../entities/forum/forum-slice'
import { IEmoji } from '../types'

const AddReaction = () => {
  const [isOpenPanelEmoji, setIsOpenPanelEmoji] = useState(false)
  const addReactionBtnRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  const onSelectEmoji = (emoji: IEmoji) => {
    dispatch(addReactionAction(emoji))
    setIsOpenPanelEmoji(false)

    //Здесь будет логика отправки асинхронного экшена
    console.log('onSelectEmoji', emoji)
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
