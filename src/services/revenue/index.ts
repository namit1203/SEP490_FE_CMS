import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class RevenueApiRequest {
  public GetListRevenue(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REVENUE.GET_REVENUE,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
}

const revenueApiRequest = new RevenueApiRequest()

export default revenueApiRequest
