import { Button, Flex, Typography } from 'antd'
import styles from './start-game.module.pcss'

type GameStateProps = {
  startGameHandler: () => void
  exitGame: () => void
}

const { Paragraph } = Typography

export function StartGame(props: GameStateProps) {
  return (
    <>
      <Paragraph className={styles.header}>Ready to start playing?</Paragraph>

      <Paragraph className={styles.controlText}>Movement</Paragraph>
      <Flex align="center" justify="center" gap={10}>
        <div className={styles.key}>W</div>
        <div className={styles.key}>A</div>
        <div className={styles.key}>S</div>
        <div className={styles.key}>D</div>
      </Flex>

      <Paragraph className={styles.controlText}>Shot</Paragraph>
      <Flex align="center" justify="center" gap={10}>
        <div className={styles.space}>SPACE</div>
        <div className={styles.lmb}>LMB</div>
      </Flex>

      <Flex align="center" justify="center" gap={10}>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.startGameHandler}
        >
          Start
        </Button>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.exitGame}
        >
          Exit
        </Button>
      </Flex>
    </>
  )
}
