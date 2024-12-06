import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import VehicleUsingApiRequest from '@/services/vehicle-using'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryVehiclesUsing = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles-using'],
    queryFn: async () => {
      const response = await VehicleUsingApiRequest.GetVehiclesUsing()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
