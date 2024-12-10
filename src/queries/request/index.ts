import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import requestApiRequest from '@/services/request'
import { RequestOption } from '@/types/DataType'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryRequest = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Request'],
    queryFn: async () => {
      const response = await requestApiRequest.GetRequest()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryRequestDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Request_details', id],
    queryFn: async () => {
      const response = await requestApiRequest.GetRequestDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAcceptCancleRequestMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => requestApiRequest.AcceptCancleRequest({ id })
  })
}

export const useAddVehicleByStaffMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null; isApprove: boolean }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, isApprove }: { id: string | number | null; isApprove: boolean }) =>
      requestApiRequest.AddVehicleByStaff({ id, isApprove })
  })
}
export const useUpdateConvenientTripMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null; choose: boolean }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, choose }: { id: string | number | null; choose: boolean }) =>
      requestApiRequest.UpdateConvenientTrip({ id, choose })
  })
}

export const useCreateTicketForRentCarMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<RequestOption, 'createTicketForRentCar'>) =>
      requestApiRequest.CreateTicketForRentCar({ body })
  })
}
export const useAddHistoryDriverMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<RequestOption, 'addHistoryDriver'>) => requestApiRequest.AddHistoryDriver({ body })
  })
}
export const useAddHistoryVehicleMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<RequestOption, 'addHistoryVehicle'>) => requestApiRequest.AddHistoryVehicle({ body })
  })
}

export const useCreateRequestDriverMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addDriverOwner'>) => requestApiRequest.CreateRequestDriver({ body })
  })
}
