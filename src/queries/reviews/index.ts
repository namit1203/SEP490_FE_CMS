import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import reviewsApiRequest from '@/services/reviews'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryReviews = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await reviewsApiRequest.GetListReviews()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useRemoveReviewsMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => reviewsApiRequest.DeleteReview({ id })
  })
}
