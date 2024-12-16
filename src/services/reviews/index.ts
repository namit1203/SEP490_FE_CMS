import { apiBaseServiceInstance } from '@/api'
import { APP_API_ENDPOINT } from '@/config/api'
import { METHOD_TYPE } from '@/config/method'

class ReviewsApiRequest {
  public GetListReviews(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REVIEWS.GET_REVIEW,
      config: { method: METHOD_TYPE.GET, cors: false }
    })
  }
  public DeleteReview({ id }: { id: string | number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.REVIEWS.DELETE_REVIEWS({ id }),
      config: { method: METHOD_TYPE.POST, cors: false }
    })
  }
}

const reviewsApiRequest = new ReviewsApiRequest()

export default reviewsApiRequest
