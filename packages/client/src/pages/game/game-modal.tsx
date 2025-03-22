import { Modal } from 'antd'
import { ReactNode } from 'react'

type GameModalProps = {
  modalOpen: boolean
  children: ReactNode
}

export function GameModal(props: GameModalProps) {
  return (
    <Modal centered closable={false} open={props.modalOpen} footer={null}>
      {props.children}
    </Modal>
  )
}
