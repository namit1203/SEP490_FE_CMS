import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import revenueApiRequest from '@/services/revenue'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryRevenue = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['revenue'],
    queryFn: async () => {
      const response = await revenueApiRequest.GetListRevenue()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}