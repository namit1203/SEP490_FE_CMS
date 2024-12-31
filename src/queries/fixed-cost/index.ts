import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import lossCostVehicleApiRequest from '@/services/fixed-cost'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

interface LossCostParams {
  startDate?: string
  endDate?: string
  vehicleId?: number | string
}

export const useQueryLossCost = (
  { startDate, endDate, vehicleId }: LossCostParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['LossCost', { startDate, endDate, vehicleId }],
    queryFn: async () => {
      const response = await lossCostVehicleApiRequest.GetLossCost({
        startDate: startDate || '',
        endDate: endDate || '',
        vehicleId: vehicleId || ''
      })

      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
      throw new Error('Failed to fetch data')
    }
  })
}

export const useUpdatelossCostMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) =>
      lossCostVehicleApiRequest.UpdateLossCost({ id, body })
  })
}

export const useAddLossCostMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addLossCost'>) => lossCostVehicleApiRequest.AddLossCost({ body })
  })
}

export const useDeleteLossCostMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => lossCostVehicleApiRequest.DeleteLossCost({ id })
  })
}
