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
}

const tripsApiRequest = new TripsApiRequest()

export default tripsApiRequest
