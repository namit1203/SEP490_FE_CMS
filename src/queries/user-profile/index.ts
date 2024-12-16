import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import userProfileApiRequest from '@/services/user-profile'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

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

export const useUpdateUserMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'updateUser'>) => userProfileApiRequest.UpdateUser({ body })
  })
}
