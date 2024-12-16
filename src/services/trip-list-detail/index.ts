import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class TripDetailApiRequest {
  public GetListTripDetail({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIP_DETAIL.GET_LIST_TRIP_DETAIL({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public AddListTripDetail({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIP_DETAIL.ADD_TRIP_DETAIL({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public GetTripDetail({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIP_DETAIL.GET_TRIP_DETAIL_ID({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public UpdateTripDetail({
    id,
    tripID,
    body
  }: {
    id: string | number | null
    tripID: string | number | null
    body: any
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TRIP_DETAIL.UPDATE_TRIP_DETAIL({ id, tripID }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const tripDetailApiRequest = new TripDetailApiRequest()

export default tripDetailApiRequest
