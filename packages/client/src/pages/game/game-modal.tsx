import { Button, Flex, Modal, Typography } from 'antd'
import { ReactNode } from 'react'
import styles from './game-modal.module.pcss'

type GameModalProps = {
  modalOpen: boolean
  title: string
  children: ReactNode
  successText: string
  cancelText: string
  successAction: () => void
  cancelAction: () => void
}

const { Title } = Typography

export function GameModal(props: GameModalProps) {
  return (
    <Modal centered closable={false} open={props.modalOpen} footer={null}>
      <Title className={styles.title}>{props.title}</Title>

      {props.children}

      <Flex align="center" justify="center" gap={10}>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.successAction}
        >
          {props.successText}
        </Button>
        <Button
          className={styles.button}
          type="primary"
          onClick={props.cancelAction}
        >
          {props.cancelText}
        </Button>
      </Flex>
    </Modal>
  )
}
