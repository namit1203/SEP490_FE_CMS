import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'
import { TLoginAuth } from '../../types/auth'

class AuthApiRequest {
  public Login({ body }: { body: TLoginAuth }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public LoginDriver({ body }: { body: TLoginAuth }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN_DRIVER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const authApiRequest = new AuthApiRequest()

export default authApiRequest
