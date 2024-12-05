import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import lossCostVehicleApiRequest from '../../services/fixed-cost'

export const useQueryLossCost = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['LossCost'],
    queryFn: async () => {
      const response = await lossCostVehicleApiRequest.GetLossCost()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddLossCostMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addLossCost'>) => lossCostVehicleApiRequest.AddLossCost({ body })
  })
}
