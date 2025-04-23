import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Store, ExtraArgument } from '../../app/store'

type AppState = ReturnType<Store['getState']>
type AppDispatch = Store['dispatch']

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  extra: ExtraArgument
}>()
