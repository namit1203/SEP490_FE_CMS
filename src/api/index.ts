import { API_CONFIGS } from '../config/env'
import { ApiClient } from './axiosClient'

const createApiClientInstance = (host: string, prefix: string): ApiClient => {
  return new ApiClient(host, prefix)
}
const apiBaseServiceInstance = createApiClientInstance(API_CONFIGS.cms_host as string, '')

export { apiBaseServiceInstance }
