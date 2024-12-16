import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

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
  public DeleteAccount({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.DELETE_ACCOUNT({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public DeleteRole({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.DELETE_ROLE({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public UpdateRoleAccount({
    id,
    newRoleId
  }: {
    id: string | number | null
    newRoleId: string | number | null
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.UPDATE_ACCOUNT({ id, newRoleId }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }

  public UpdateRole({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.UPDATE_ROLE({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddRole({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.ACCOUNT.ADD_ROLE,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const accountApiRequest = new AccountApiRequest()

export default accountApiRequest
