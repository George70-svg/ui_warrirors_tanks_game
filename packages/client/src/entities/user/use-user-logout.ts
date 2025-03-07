import { useCallback, useState } from 'react'
import { apiCall } from '../../shared/api'
import { ApiError } from '../../shared/api/api-error'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

type InitialState = {
  isLoading: boolean
  error?: ApiError
}

export function useUserLogout() {
  const [state, setState] = useState<InitialState>(() => ({
    isLoading: false,
  }))

  const navigate = useNavigate()
  const fn = useCallback(async () => {
    try {
      await apiCall({
        url: '/auth/logout',
        method: 'POST',
      })
      navigate(ROUTES.SIGN_IN)
    } catch (error) {
      setState((state) => ({
        ...state,
        error: error as ApiError,
      }))
    } finally {
      setState((state) => ({ ...state, isLoading: false }))
    }
  }, [navigate])

  return {
    logoutLoading: state.isLoading,
    error: state.error,
    fn,
  }
}
