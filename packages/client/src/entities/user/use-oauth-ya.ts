import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { oauthYa } from './api/oauth'
import { useAppDispatch } from '../../shared/lib'
import { OAUTH_YA_REDIRECT_URI } from '../../shared/config/constants'

export const useOauthYa = () => {
  const dispatch = useAppDispatch()
  const [searchParams, _] = useSearchParams()
  const code = searchParams.get('code')
  const isRunningOauthYa = useRef(false)

  useEffect(() => {
    if (code && !isRunningOauthYa.current) {
      const params = {
        code,
        redirect_uri: OAUTH_YA_REDIRECT_URI,
      }
      dispatch(oauthYa(params))
      isRunningOauthYa.current = true
    }
  }, [dispatch, code])
}
