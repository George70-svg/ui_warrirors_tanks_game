import { useCallback, useState } from 'react'
import { UserSignInDto } from './types'
import { apiCall } from '../../shared/api'
import { ApiError } from '../../shared/api/api-error'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config'
import { useError } from '../../shared/ui'

type InitialState = {
  isLoading: boolean
  error?: ApiError
}

export function useUserSignIn() {
  const [state, setState] = useState<InitialState>(() => ({
    isLoading: false,
  }))
  const showError = useError()

  const navigate = useNavigate()
  const fn = useCallback(
    async (data: UserSignInDto) => {
      setState((state) => ({ ...state, isLoading: true }))
      try {
        await apiCall({
          url: '/auth/signin',
          data,
          method: 'POST',
        })
        navigate(ROUTES.HOME)
      } catch (error) {
        setState((state) => ({
          ...state,
          error: error as ApiError,
        }))
        showError(error)
      } finally {
        setState((state) => ({ ...state, isLoading: false }))
      }
    },
    [navigate, showError]
  )

  return {
    isLoading: state.isLoading,
    error: state.error,
    fn,
  }
}
