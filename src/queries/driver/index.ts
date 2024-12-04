import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import driverApiRequest from '../../services/driver'

export const useQueryDriver = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Driver'],
    queryFn: async () => {
      const response = await driverApiRequest.GetDrivers()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryDriverDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Driver_details', id],
    queryFn: async () => {
      const response = await driverApiRequest.GetDriversDetails({ id })
      if (response.code === HttpStatusCode.Ok) {
        return response.metadata
      }
    }
  })
}

export const useAddDriverMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addDriver'>) => driverApiRequest.AddDriver({ body })
  })
}
