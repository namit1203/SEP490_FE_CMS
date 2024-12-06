import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class vehicleUsingApiRequest {
  public GetVehiclesUsing(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES_USING.GET,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
}

const VehicleUsingApiRequest = new vehicleUsingApiRequest()

export default VehicleUsingApiRequest
