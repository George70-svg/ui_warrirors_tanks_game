import axios, { isAxiosError, ResponseType } from 'axios'
import { ApiError } from './api-error'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ConfigFacade = {
  url: string
  method?: Method
  params?: Record<string, unknown>
  data?: Record<string, unknown> | FormData
  responseType?: ResponseType
  signal?: AbortSignal
}

const axiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
})

export async function apiCall<T>(config: ConfigFacade) {
  try {
    const result = await axiosInstance<T>(config)
    return result.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new ApiError(error.message, error.status, error.response?.data)
    } else if (error instanceof Error) {
      throw new ApiError(error.message)
    }
    throw new ApiError('Unknown error')
  }
}
