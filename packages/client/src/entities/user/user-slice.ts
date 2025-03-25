import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getUserData } from './api/get-user-data'
import { UserInfoDto } from './api/types'
import { logout } from './api/logout'
import { signIn } from './api/sign-in'
import { signUp } from './api/sign-up'
import { updateProfile } from './api/update-profile'
import { uploadAvatar } from './api/upload-avatar'
import { updatePassword } from './api/update-password'

type UserState = {
  fetchUserAuthStatus: 'idle' | 'pending' | 'success'
  isUserDataUpdating: boolean
  data?: UserInfoDto | null
}

const initialState: UserState = {
  fetchUserAuthStatus: 'idle',
  isUserDataUpdating: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  selectors: {
    selectUserData: (state) => state.data,
    selectIsUserAuthStatusIdle: (state) => state.fetchUserAuthStatus === 'idle',
    selectIsUserAuthStatusSuccess: (state) =>
      state.fetchUserAuthStatus === 'success',
    selectIsUserAuthenticated: (state) => !!state.data,
    selectIsUserDataUpdating: (state) => state.isUserDataUpdating,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.fetchUserAuthStatus = 'pending'
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.fetchUserAuthStatus = 'success'
        state.data = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.isUserDataUpdating = false
        state.data = null
      })
      .addMatcher(
        isAnyOf(
          logout.pending,
          signIn.pending,
          signUp.pending,
          updateProfile.pending,
          uploadAvatar.pending,
          updatePassword.pending
        ),
        (state) => {
          state.isUserDataUpdating = true
        }
      )
      .addMatcher(
        isAnyOf(
          logout.rejected,
          signIn.rejected,
          updateProfile.rejected,
          signUp.rejected,
          updatePassword.rejected,
          updatePassword.fulfilled,
          uploadAvatar.rejected
        ),
        (state) => {
          state.isUserDataUpdating = false
        }
      )
      .addMatcher(
        isAnyOf(
          uploadAvatar.fulfilled,
          updateProfile.fulfilled,
          signUp.fulfilled,
          signIn.fulfilled
        ),
        (state, action) => {
          state.isUserDataUpdating = false
          state.data = action.payload
        }
      )
  },
})

export const {
  selectIsUserAuthStatusIdle,
  selectIsUserAuthStatusSuccess,
  selectUserData,
  selectIsUserAuthenticated,
  selectIsUserDataUpdating,
} = userSlice.selectors

export const { reducer: userReducer } = userSlice
