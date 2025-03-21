import { useEffect } from 'react'
import {
  selectIsUserAuthenticated,
  selectIsUserAuthStatusIdle,
  selectIsUserAuthStatusSuccess,
} from './user-slice'
import { getUserData } from './api/get-user-data'
import { useAppDispatch, useAppSelector } from '../../shared/lib'

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
