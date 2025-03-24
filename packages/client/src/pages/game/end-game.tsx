import { Typography } from 'antd'
import styles from './end-game.module.pcss'

const { Paragraph } = Typography

export function EndGame() {
  return (
    <>
      <Paragraph className={styles.scoreText}>Your score: {100}</Paragraph>
    </>
  )
}
