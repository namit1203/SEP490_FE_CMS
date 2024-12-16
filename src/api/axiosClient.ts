import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import axios, { AxiosRequestConfig, Method } from 'axios'

interface ApiClientConfig {
  method?: Method
  body?: any
  token?: string
  cors?: boolean
}

export class ApiClient {
  private host: string
  private prefix: string
  private headers: {
    Accept: string
    lang: string
    Authorization?: string
  }

  constructor(host: string, prefix: string = '') {
    this.host = host
    this.prefix = prefix
    this.headers = {
      Accept: 'application/json',
      lang: 'vi'
    }
  }

  private get basePath(): string {
    return this.prefix ? `${this.host}/${this.prefix}` : this.host
  }

  private getHeaders(config: ApiClientConfig): Record<string, string> {
    const headers: Record<string, string> = { ...this.headers }
    const token = useLocalStorage.getLocalStorageData('token')

    if (token || config.token) {
      headers.Authorization = `Bearer ${token || config.token}`
    }
    return headers
  }

  public async Http({
    path,
    config = {}
  }: {
    path: string
    config?: ApiClientConfig & { responseType?: 'json' | 'blob' }
  }): Promise<any> {
    const { method = 'GET', body, cors = true, responseType = 'json' } = config // Default to 'json'
    const headers = this.getHeaders(config)

    const axiosConfig: AxiosRequestConfig = {
      method,
      headers,
      url: this.basePath + path,
      data: method !== 'GET' ? body : undefined,
      withCredentials: cors,
      responseType // Dynamically set the response type
    }

    try {
      const response = await axios(axiosConfig)
      return response
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response

        if (status === 401) {
          useLocalStorage.removeLocalStorageData('token')
        }

        return error.response.data
      }
      throw error
    }
  }
}
