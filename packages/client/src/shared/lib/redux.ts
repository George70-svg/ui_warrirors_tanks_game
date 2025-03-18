import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { store, extraArgument } from '../../app/ui/store'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  extra: typeof extraArgument
}>()
