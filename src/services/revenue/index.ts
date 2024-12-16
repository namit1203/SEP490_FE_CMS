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

  public async ExportRevenue({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REVENUE.EXPORT_REVENUE,
      config: { method: 'POST', body, responseType: 'blob', cors: false }
    })
  }
}

const revenueApiRequest = new RevenueApiRequest()

export default revenueApiRequest
