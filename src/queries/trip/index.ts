import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import tripsApiRequest from '@/services/trip'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryTrips = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['trips'],
    queryFn: async () => {
      const response = await tripsApiRequest.GetTrips()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTypeOfTrips = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['typeOfTrip'],
    queryFn: async () => {
      const response = await tripsApiRequest.GetTypeOfTrips()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddTripMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addTrip'>) => tripsApiRequest.AddTrip({ body })
  })
}
