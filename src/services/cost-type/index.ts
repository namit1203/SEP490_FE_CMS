import { apiBaseServiceInstance } from '../../api'
import { APP_API_ENDPOINT } from '../../config/api'
import { METHOD_TYPE } from '../../config/method'

class CostTypeApiRequest {
  public GetCostTypes(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.COST_TYPE.GET_COST_TYPE,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteCostType({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.COST_TYPE.DELETE_COST_TYPE({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public AddCostType({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.COST_TYPE.ADD_COST_TYPE,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const costTypeApiRequest = new CostTypeApiRequest()

export default costTypeApiRequest
