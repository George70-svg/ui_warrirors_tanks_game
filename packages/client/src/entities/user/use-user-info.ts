import { useEffect, useState } from 'react'
import { UserInfoDto } from './types'
import { apiCall } from '../../shared/api'
import { ApiError } from '../../shared/api/api-error'

type InitialState = {
  isLoading: boolean
  error?: ApiError
  data?: UserInfoDto
}

export function useUserInfo() {
  const [state, setState] = useState<InitialState>(() => ({
    isLoading: true,
  }))

  useEffect(() => {
    const userInfoFn = async () => {
      try {
        const result = await apiCall<UserInfoDto>({
          url: '/auth/user',
        })
        setState((state) => ({ ...state, data: result, error: undefined }))
      } catch (error) {
        setState((state) => ({
          ...state,
          data: undefined,
          error: error as ApiError,
        }))
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    }
    userInfoFn()
  }, [])

  return state
}
