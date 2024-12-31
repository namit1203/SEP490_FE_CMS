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
  public WithoutVehicle({ id }: { id: string | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.WITHOUT_VEHICLE({ id }),
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
  public BlockDriver({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.BLOCK_DRIVER({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public AddDriver({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.ADD_DRIVER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public UpdateDriver({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.DRIVER.UPDATE_DRIVER({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const driverApiRequest = new DriverApiRequest()

export default driverApiRequest
