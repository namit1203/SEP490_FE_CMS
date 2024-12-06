import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class DriverApiRequest {
  public GetDrivers(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.GET_DRIVER,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetDriversDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.DRIVER_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteDriver({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.DELETE_DRIVER({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public AddDriver({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.ADD_DRIVER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const driverApiRequest = new DriverApiRequest()

export default driverApiRequest
