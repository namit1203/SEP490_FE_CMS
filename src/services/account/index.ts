import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

class AccountApiRequest {
  public GetListAccount(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.GET_ACCOUNT,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetListRole(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.GET_ROLE,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetAccountDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.GET_ACCOUNT_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
}

const accountApiRequest = new AccountApiRequest()

export default accountApiRequest
