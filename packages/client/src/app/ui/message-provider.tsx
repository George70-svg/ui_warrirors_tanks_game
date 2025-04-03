import { ReactElement, useEffect } from 'react'
import { message } from 'antd'
import { messageProvider } from '../../shared/lib'

export const MessageProvider = ({ children }: { children: ReactElement }) => {
  const [msgApi, contextHolder] = message.useMessage({
    duration: 2,
    maxCount: 1,
  })
  useEffect(() => {
    messageProvider.setMessageApi(msgApi)
  }, [msgApi])
  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}
