import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import userProfileApiRequest from '../../services/user-profile'

export const useQueryUserProfile = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userProfileApiRequest.GetUser()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
