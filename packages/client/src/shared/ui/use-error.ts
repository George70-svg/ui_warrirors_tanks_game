import { App } from 'antd'
import { useCallback } from 'react'

export function useError() {
  const { notification } = App.useApp()
  return useCallback(
    (error: unknown) => {
      notification.error({ message: JSON.stringify(error) })
    },
    [notification]
  )
}
