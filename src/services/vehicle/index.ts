import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class VehicleApiRequest {
  public GetVehicles(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_VEHICLES,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetVehiclesNoTrip(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_NO_TRIPS,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetVehiclesOwner(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_VEHICLES_OWNER,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetStartPointVehicles(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_START_POINT,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetEndPointVehicles({ startPoint }: { startPoint: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.GET_END_POINT({ startPoint }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTypeOfVehicles(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.TYPE_OF_VEHICLES,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTypeOfVehiclesOwner(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.TYPE_VEHICLES_OWNER,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetCheckSeat({ checkDate }: { checkDate: string | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.CHECK_SEAT_AVAILABLE({ checkDate }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public GetVehiclesDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.VEHICLES_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteVehicles({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.DELETE_VEHICLES({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public UpdateVehiclesOwner({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.UPDATE_VEHICLE_OWNER({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddVehicles({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.ADD_VEHICLES,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public UpdateVehicles({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.UPDATE_VEHICLES({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public ImportVehicleExcel({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.IMPORT_VEHICLE,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddVehiclesFromExcel({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.ADD_VEHICLES_FROM_EXCEL,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public ExportVehicleExcel(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.EXPORT_VEHICLE,
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }

  public DeleteVehiclesOwner({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.VEHICLES.DELETE_VEHICLES_OWNER({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
}

const vehicleApiRequest = new VehicleApiRequest()

export default vehicleApiRequest
