import axios, { isAxiosError, ResponseType } from 'axios'
import { ApiError } from './api-error'
import { ApiConfig } from './api-config'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ConfigFacade = {
  url: string
  method?: Method
  params?: Record<string, unknown>
  data?: Record<string, unknown> | FormData
  responseType?: ResponseType
  signal?: AbortSignal
  headers?: { [key: string]: string }
}

const axiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
})

export async function apiCall<T>(config: ConfigFacade, apiConfig?: ApiConfig) {
  const axiosConfig = {
    ...apiConfig,
    ...config,
    headers: {
      ...apiConfig?.headers,
      ...config.headers,
    },
  }

  try {
    const result = await axiosInstance<T>(axiosConfig)
    return result.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new ApiError(
        error.message,
        error.status,
        error.response?.data?.reason
      )
    } else if (error instanceof Error) {
      throw new ApiError(error.message)
    }
    throw new ApiError('Unknown error')
  }
}
