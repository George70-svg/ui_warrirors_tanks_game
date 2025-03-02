import { useCallback, useState } from 'react'
import { UserSignUpDto } from './types'
import { apiCall } from '../../shared/api'
import { ApiError } from '../../shared/api/api-error'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

type InitialState = {
  isLoading: boolean
  error?: ApiError
}

export function useUserSignUp() {
  const [state, setState] = useState<InitialState>(() => ({
    isLoading: false,
  }))

  const navigate = useNavigate()
  const fn = useCallback(
    async (data: UserSignUpDto) => {
      try {
        await apiCall({
          url: '/auth/signup',
          data,
          method: 'POST',
        })
        navigate(ROUTES.HOME)
      } catch (error) {
        setState((state) => ({
          ...state,
          error: error as ApiError,
        }))
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    },
    [navigate]
  )

  return {
    isLoading: state.isLoading,
    error: state.error,
    fn,
  }
}
