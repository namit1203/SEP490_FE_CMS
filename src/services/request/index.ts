import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

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
}

const requestApiRequest = new RequestApiRequest()

export default requestApiRequest
