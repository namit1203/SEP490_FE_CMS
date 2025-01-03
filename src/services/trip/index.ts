import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class TripsApiRequest {
  public GetTrips(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TRIPS,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTripsConvenience(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TRIPS_CONVENIENT,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetTripDetail({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TRIP_DETAIL({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public GetTripConvenientDetail({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TRIP_CONVENIENT_DETAIL({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public GetTypeOfTrips(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.GET_TYPE_OF_TRIPS,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public AddTrip({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.ADD_TRIP,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public AddTripConvenience({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.ADD_TRIP_CONVENIENT,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public UpdateTrip({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.UPDATE_TRIPS({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public UpdateTripConvenient({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.UPDATE_TRIPS_CONVENIENT({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public ImportTripExcel({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.IMPORT_TRIPS({ typeOfTrip: id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public ConfirmImportTripExcel({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.CONFIRM_IMPORT_TRIPS({ typeOfTrip: id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public UpdateStatusTrip({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.UPDATE_STATUS_TRIP({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public UpdateStatusTripConvenient({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIPS.UPDATE_STATUS_TRIP_CONVENIENT({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
}

const tripsApiRequest = new TripsApiRequest()

export default tripsApiRequest
