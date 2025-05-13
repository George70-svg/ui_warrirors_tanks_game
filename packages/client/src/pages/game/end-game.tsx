import { Typography } from 'antd'
import styles from './end-game.module.pcss'

const { Paragraph } = Typography

export function EndGame(props: { score: number }) {
  return (
    <Paragraph className={styles.scoreText}>
      Your score: {props.score}
    </Paragraph>
  )
}
