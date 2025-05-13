import { Flex, Typography } from 'antd'
import styles from './start-game.module.pcss'
import classNames from 'classnames'

const { Paragraph } = Typography

export function StartGame() {
  return (
    <>
      <Paragraph className={styles.controlText}>Movement</Paragraph>
      <Flex align="center" justify="center" gap={10}>
        <div className={classNames(styles.key, styles.buttonContainer)}>W</div>
        <div className={classNames(styles.key, styles.buttonContainer)}>A</div>
        <div className={classNames(styles.key, styles.buttonContainer)}>S</div>
        <div className={classNames(styles.key, styles.buttonContainer)}>D</div>
      </Flex>

      <Paragraph className={styles.controlText}>Shot</Paragraph>
      <Flex align="center" justify="center" gap={10}>
        <div className={classNames(styles.space, styles.buttonContainer)}>
          SPACE
        </div>
        <div className={classNames(styles.lmb, styles.buttonContainer)}>
          LMB
        </div>
      </Flex>
    </>
  )
}
