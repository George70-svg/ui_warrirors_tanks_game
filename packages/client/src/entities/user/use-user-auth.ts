import { useEffect, useRef } from 'react'
import {
  selectIsUserAuthenticated,
  selectIsUserAuthStatusIdle,
  selectIsUserAuthStatusSuccess,
} from './user-slice'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import { getUserData, oauthYa } from './index'
import { useSearchParams } from 'react-router-dom'

export function useUserAuth() {
  const dispatch = useAppDispatch()
  const isUserAuthStatusSuccess = useAppSelector(selectIsUserAuthStatusSuccess)
  const isUserAuthStatusIdle = useAppSelector(selectIsUserAuthStatusIdle)
  const isUserAuthorized = useAppSelector(selectIsUserAuthenticated)
  const [searchParams, _] = useSearchParams()
  const code = searchParams.get('code')
  const serverHost = 'localhost'
  const serverPort = '3000'
  const redirect_uri = `http://${serverHost}:${serverPort}`

  const isRuningOauthYa = useRef(false)

  useEffect(() => {
    if (code && redirect_uri && !isRuningOauthYa.current) {
      const params = {
        code,
        redirect_uri,
      }
      dispatch(oauthYa(params))
      isRuningOauthYa.current = true
    }

    if (isUserAuthStatusIdle) {
      dispatch(getUserData())
    }
  }, [dispatch, isUserAuthStatusIdle, code, redirect_uri])

  return {
    isUserAuthStatusSuccess,
    isUserAuthorized,
  }
}
