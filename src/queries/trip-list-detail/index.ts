import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import tripDetailApiRequest from '@/services/trip-list-detail'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryListTripDetail = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['list_trip_detail', id],
    queryFn: async () => {
      const response = await tripDetailApiRequest.GetListTripDetail({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryGetTripDetail = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['trip_detail', id],
    queryFn: async () => {
      const response = await tripDetailApiRequest.GetTripDetail({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddListTripDetailMutation = (
  options?: UseMutationOptions<
    any, // Response type
    unknown, // Error type
    { id: string | number; body: any }, // Mutation variables type
    unknown // Context type
  >
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) =>
      tripDetailApiRequest.AddListTripDetail({ id, body })
  })
}
export const useUpdateListTripDetailMutation = (
  options?: UseMutationOptions<
    any, // Response type
    unknown, // Error type
    { id: string | number; body: any }, // Mutation variables type
    unknown // Context type
  >
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, tripID, body }: { id: string | number; tripID: string | number; body: any }) =>
      tripDetailApiRequest.UpdateTripDetail({ id, tripID, body })
  })
}
