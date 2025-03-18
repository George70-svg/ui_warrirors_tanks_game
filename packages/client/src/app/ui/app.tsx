import { RouterProvider } from 'react-router-dom'
import { router } from './routing/router'
import './app.pcss'
import { message } from 'antd'
import { useEffect } from 'react'
import { messageProvider } from '../../shared/lib'

export function App() {
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
      <RouterProvider router={router} />
    </>
  )
}
