import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import historyApiRequest from '@/services/history'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryHistoryRentVehicle = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_vehicle'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentVehicle()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryHistoryRentDriver = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_driver'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentDriver()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryDriverRent = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['driver_rent'],
    queryFn: async () => {
      const response = await historyApiRequest.GetListDriverRent()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryVehicleRent = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicle_rent', id],
    queryFn: async () => {
      const response = await historyApiRequest.GetListVehicleRent({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryVehicleUseRent = (
  { date }: { date: string | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicle_use_rent', date],
    queryFn: async () => {
      const response = await historyApiRequest.GetListVehicleUseRent({ date })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
