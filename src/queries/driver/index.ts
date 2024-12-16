import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import driverApiRequest from '@/services/driver'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

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
      if (response.status === HttpStatusCode.Ok) {
        return response.data
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

export const useUpdateDriverMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => driverApiRequest.UpdateDriver({ id, body })
  })
}

export const useBlockDriverMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number }) => driverApiRequest.BlockDriver({ id })
  })
}
