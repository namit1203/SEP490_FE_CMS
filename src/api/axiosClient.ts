import axios, { AxiosRequestConfig, Method } from 'axios'
import { useLocalStorage } from '../utils/localStorage/localStorageService'

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
    if (config.token) {
      headers.Authorization = `Bearer ${config.token}`
    }
    return headers
  }

  public async Http({ path, config = {} }: { path: string; config?: ApiClientConfig }): Promise<any> {
    const { method = 'GET', body, cors = true } = config
    const headers = this.getHeaders(config)

    const axiosConfig: AxiosRequestConfig = {
      method,
      headers,
      url: this.basePath + path,
      data: method !== 'GET' ? body : undefined,
      withCredentials: cors
    }

    try {
      const response = await axios(axiosConfig)
      return response
    } catch (error: any) {
      if (error.response) {
        // Axios specific error handling

        const { status } = error.response

        // Check for 401 Unauthorized status
        if (status === 401) {
          useLocalStorage.removeLocalStorageData('token')
        }

        return error.response.data
      }
      // Other errors
      throw error
    }
  }
}
