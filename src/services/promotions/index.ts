import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class PromotionApiRequest {
  public GetPromotions(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.GET_PROMOTION,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public GetPromotionsDetails({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.PROMOTION_DETAILS({ id }),
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeletePromotion({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.DELETE_PROMOTION({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
  public AddPromotion({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.ADD_PROMOTION,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
  public AddPromotionToAllUsers({ body }: { body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.ADD_PROMOTION_ALL_USER,
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }

  public UpdatePromotion({ id, body }: { id: string | number | null; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.PROMOTION.UPDATE_PROMOTION({ id }),
      config: { method: METHOD_TYPE.POST, body, cors: false }
    })
  }
}

const promotionApiRequest = new PromotionApiRequest()

export default promotionApiRequest
