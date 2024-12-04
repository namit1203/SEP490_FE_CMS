import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import promotionApiRequest from '../../services/promotions'

export const useQueryPromotion = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Promotion'],
    queryFn: async () => {
      const response = await promotionApiRequest.GetPromotions()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryPromotionDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Promotion_details', id],
    queryFn: async () => {
      const response = await promotionApiRequest.GetPromotionsDetails({ id })
      if (response.code === HttpStatusCode.Ok) {
        return response.metadata
      }
    }
  })
}

export const useAddPromotionMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addPromotion'>) => promotionApiRequest.AddPromotion({ body })
  })
}
