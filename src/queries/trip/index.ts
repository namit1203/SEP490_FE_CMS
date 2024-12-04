import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import tripsApiRequest from '../../services/trip'

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
