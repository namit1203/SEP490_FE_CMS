import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class LossCostVehicleApiRequest {
  public GetLossCost({
    startDate,
    endDate,
    vehicleId
  }: {
    startDate: string
    endDate: string
    vehicleId: number | string
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.LOSS_COST_VEHICLE.GET_COST({ startDate, endDate, vehicleId }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteLossCost({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.LOSS_COST_VEHICLE.DELETE_COST({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }

  public UpdateLossCost({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.LOSS_COST_VEHICLE.UPDATE_COST({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddLossCost({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.LOSS_COST_VEHICLE.ADD_COST,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const lossCostVehicleApiRequest = new LossCostVehicleApiRequest()

export default lossCostVehicleApiRequest
