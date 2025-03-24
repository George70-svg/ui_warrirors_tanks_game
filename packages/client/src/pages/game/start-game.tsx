import { Flex, theme, Typography } from 'antd'
import styles from './start-game.module.pcss'

const { Paragraph } = Typography
const { useToken } = theme

export function StartGame() {
  const { token } = useToken()

  return (
    <>
      <Paragraph className={styles.controlText}>Movement</Paragraph>
      <Flex
        align="center"
        justify="center"
        style={{ borderColor: token.colorWarningText }}
        gap={10}
      >
        <div className={styles.key}>W</div>
        <div className={styles.key}>A</div>
        <div className={styles.key}>S</div>
        <div className={styles.key}>D</div>
      </Flex>

      <Paragraph className={styles.controlText}>Shot</Paragraph>
      <Flex
        align="center"
        justify="center"
        style={{ borderColor: token.colorWarningText }}
        gap={10}
      >
        <div className={styles.space}>SPACE</div>
        <div className={styles.lmb}>LMB</div>
      </Flex>
    </>
  )
}
