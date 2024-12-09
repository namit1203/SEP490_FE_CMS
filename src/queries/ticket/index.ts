import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import ticketApiRequest from '@/services/ticket'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryTicket = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket'],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicket()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryTicketDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket_details', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicketDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTravelCarByRequest = (
  { id }: { id: string | number | null | any },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['TravelCar_details', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTravelCarByRequest({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTicketNotPaid = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Ticket_not_paid', id],
    queryFn: async () => {
      const response = await ticketApiRequest.GetTicketNotPaid({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useRemoveTicketMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => ticketApiRequest.DeleteTicket({ id })
  })
}
export const useUpdateStatusTicketMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => ticketApiRequest.UpdateStatusTicket({ id })
  })
}
