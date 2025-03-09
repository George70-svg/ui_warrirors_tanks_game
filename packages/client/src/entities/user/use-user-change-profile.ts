import { useCallback, useState } from 'react'
import { UserInfoDto } from './types'
import { apiCall } from '../../shared/api'
import { ApiError } from '../../shared/api/api-error'
import { App } from 'antd'

type InitialState = {
  isLoading: boolean
  error?: ApiError
}

export function useUserEditInfo() {
  const [state, setState] = useState<InitialState>(() => ({
    isLoading: false,
  }))

  const { message } = App.useApp()

  const changeInfo = useCallback(
    async (data: UserInfoDto): Promise<UserInfoDto | null> => {
      try {
        const res: UserInfoDto = await apiCall({
          url: '/user/profile',
          data,
          method: 'PUT',
        })
        message.success('Successfully edited profile info!')
        return res
      } catch (error) {
        setState((state) => ({
          ...state,
          error: error as ApiError,
        }))
        message.error('Error!')
        return null
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    },
    [message]
  )

  const changeAvatar = useCallback(
    async (data: FormData): Promise<UserInfoDto | null> => {
      try {
        const res: UserInfoDto = await apiCall({
          url: '/user/profile/avatar',
          data,
          method: 'PUT',
        })
        message.success('Successfully edited profile photo!')
        return res
      } catch (error) {
        setState((state) => ({
          ...state,
          error: error as ApiError,
        }))
        message.error('Error!')
        return null
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    },
    [message]
  )

  return {
    isLoading: state.isLoading,
    error: state.error,
    changeInfo,
    changeAvatar,
  }
}
