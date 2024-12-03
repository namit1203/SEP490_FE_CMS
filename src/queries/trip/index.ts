import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import tripsApiRequest from '../../services/trip'
import { useLocalStorage } from '../../utils/localStorage/localStorageService'

export const useQueryTrips = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  const token = useLocalStorage.getLocalStorageData('token')
  return useQuery<any>({
    ...options,
    queryKey: ['trips'],
    queryFn: async () => {
      const response = await tripsApiRequest.GetTrips({ token })
      if (response.status === HttpStatusCode.Ok) {
        console.log('response', response)
      }
    }
  })
}
