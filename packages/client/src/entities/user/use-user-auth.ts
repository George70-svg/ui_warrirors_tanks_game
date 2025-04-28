import { useEffect } from 'react'
import {
  selectIsUserAuthenticated,
  selectIsUserAuthStatusIdle,
  selectIsUserAuthStatusSuccess,
} from './user-slice'
import { useAppDispatch, useAppSelector } from '../../shared/lib'
import { getUserData } from './index'

export function useUserAuth() {
  const dispatch = useAppDispatch()
  const isUserAuthStatusSuccess = useAppSelector(selectIsUserAuthStatusSuccess)
  const isUserAuthStatusIdle = useAppSelector(selectIsUserAuthStatusIdle)
  const isUserAuthorized = useAppSelector(selectIsUserAuthenticated)

  useEffect(() => {
    if (isUserAuthStatusIdle) {
      dispatch(getUserData())
    }
  }, [dispatch, isUserAuthStatusIdle])

  return {
    isUserAuthStatusSuccess,
    isUserAuthorized,
  }
}
