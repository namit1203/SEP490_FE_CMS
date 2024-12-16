import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'
import { RequestOption } from '@/types/DataType'

class RequestApiRequest {
  public GetRequest(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.GET_REQUEST,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetRequestDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.REQUEST_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public AcceptCancleRequest({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.ACCEPT_CANCLE_REQUEST({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public DeleteRequest({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.DELETE_REQUEST({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }

  public CreateTicketForRentCar({ body }: { body: RequestOption }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TICKET.CREATE_FOR_RENT_CAR,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddHistoryDriver({ body }: { body: RequestOption }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.HISTORY_RENT_DRIVER.ADD_HISTORY_DRIVER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public CreateRequestDriver({ body }: { body: RequestOption }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.CREATE_REQUEST_DRIVER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public CreateRequestOwner({ body }: { body: RequestOption }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.CREATE_REQUEST_OWNER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddHistoryVehicle({ body }: { body: RequestOption }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.HISTORY_RENT_VEHICLE.ADD_HISTORY_VEHICLE,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddVehicleByStaff({ id, isApprove }: { id: string | number | null; isApprove: boolean }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.ADD_VEHICLES_STAFF({ id, isApprove }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public UpdateConvenientTrip({
    id,
    choose,
    vehicleId
  }: {
    id: string | number | null
    choose: boolean
    vehicleId: string | number | null
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REQUEST.UPDATE_CONVENIENT_TRIP({ id, choose, vehicleId }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
}

const requestApiRequest = new RequestApiRequest()

export default requestApiRequest
