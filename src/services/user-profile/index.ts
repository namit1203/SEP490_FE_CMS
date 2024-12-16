import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class UserProfileApiRequest {
  public GetUser(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER_PROFILE.GET_DATA,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }

  public UpdateUser({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER_PROFILE.UPDATE_DATA,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const userProfileApiRequest = new UserProfileApiRequest()

export default userProfileApiRequest
