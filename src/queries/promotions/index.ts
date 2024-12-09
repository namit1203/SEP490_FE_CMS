import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import promotionApiRequest from '@/services/promotions'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

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
      if (response.status === HttpStatusCode.Ok) {
        return response.data
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

export const useAddPromotionToAllUserMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addPromotionToAllUser'>) => promotionApiRequest.AddPromotionToAllUsers({ body })
  })
}

export const useDeletePromotionMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => promotionApiRequest.DeletePromotion({ id })
  })
}
