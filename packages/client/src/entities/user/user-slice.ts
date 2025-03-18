import { createSlice } from '@reduxjs/toolkit'
import { getUserData } from './api/get-user-data'
import { UserInfoDto } from './api/types'
import { logout } from './api/logout'
import { signIn } from './api/sign-in'
import { signUp } from './api/sign-up'
import { updateProfile } from './api/update-profile'
import { uploadAvatar } from './api/upload-avatar'

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
      .addCase(logout.pending, (state) => {
        state.isUserDataUpdating = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isUserDataUpdating = false
        state.data = null
      })
      .addCase(logout.rejected, (state) => {
        state.isUserDataUpdating = false
      })
      .addCase(signIn.pending, (state) => {
        state.isUserDataUpdating = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isUserDataUpdating = false
        state.data = action.payload
      })
      .addCase(signIn.rejected, (state) => {
        state.isUserDataUpdating = false
      })
      .addCase(signUp.pending, (state) => {
        state.isUserDataUpdating = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isUserDataUpdating = false
        state.data = action.payload
      })
      .addCase(signUp.rejected, (state) => {
        state.isUserDataUpdating = false
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUserDataUpdating = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUserDataUpdating = false
        state.data = action.payload
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUserDataUpdating = false
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.isUserDataUpdating = true
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isUserDataUpdating = false
        state.data = action.payload
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.isUserDataUpdating = false
      })
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
