import { Button, Flex, Typography } from 'antd'
import styles from './end-game.module.pcss'

type GameStateProps = {
  restartGame: () => void
  exitGame: () => void
}

const { Paragraph } = Typography

export function EndGame(props: GameStateProps) {
  return (
    <>
      <Paragraph className={styles.header}>Game Over</Paragraph>
      <Paragraph className={styles.scoreText}>Your score: {100}</Paragraph>

      <Flex align="center" justify="center" gap={10}>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.exitGame}
        >
          Exit
        </Button>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.restartGame}
        >
          Restart
        </Button>
      </Flex>
    </>
  )
}
