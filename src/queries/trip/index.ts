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

export const useQueryTripConvenience = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['trips_convenience'],
    queryFn: async () => {
      const response = await tripsApiRequest.GetTripsConvenience()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryTripDetail = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['trip_detail', id],
    queryFn: async () => {
      const response = await tripsApiRequest.GetTripDetail({ id })
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

export const useAddTripConvenienceMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addTripConvenience'>) => tripsApiRequest.AddTripConvenience({ body })
  })
}

export const useUpdateTripMutation = (
  options?: UseMutationOptions<
    any, // Response type
    unknown, // Error type
    { id: string | number; body: any }, // Mutation variables type
    unknown // Context type
  >
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => tripsApiRequest.UpdateTrip({ id, body })
  })
}

export const useImportExcel = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: Omit<any, 'importExcel'> }) =>
      tripsApiRequest.ImportTripExcel({ id, body })
  })
}

export const useConfirmImportExcel = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: Omit<any, 'importExcel'> }) =>
      tripsApiRequest.ConfirmImportTripExcel({ id, body })
  })
}

export const useUpdateStatusTripMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => tripsApiRequest.UpdateStatusTrip({ id })
  })
}
