import { Button, Flex, Modal, Typography } from 'antd'
import { ReactNode } from 'react'
import styles from './game-modal.module.pcss'

type GameModalProps = {
  open: boolean
  children: ReactNode
  onAccept: () => void
  onDismiss: () => void
  acceptText: string
  dismissText: string
  header: string
}

const { Paragraph } = Typography

export function GameModal({
  open,
  onDismiss,
  onAccept,
  dismissText,
  acceptText,
  children,
  header,
}: GameModalProps) {
  return (
    <Modal centered closable={false} open={open} footer={null}>
      <Paragraph className={styles.header}>{header}</Paragraph>
      {children}
      <Flex align="center" justify="center" gap={10}>
        <Button className={styles.button} type="primary" onClick={onAccept}>
          {acceptText}
        </Button>
        <Button className={styles.button} type="primary" onClick={onDismiss}>
          {dismissText}
        </Button>
      </Flex>
    </Modal>
  )
}
