import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import vehicleApiRequest from '@/services/vehicle'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryVehicles = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehicles()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryVehiclesDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles_details', id],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehiclesDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddVehiclesMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addVehicle'>) => vehicleApiRequest.AdVehicles({ body })
  })
}
