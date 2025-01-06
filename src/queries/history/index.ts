import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import historyApiRequest from '@/services/history'
import { FilterParams } from '@/types/DataType'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryHistoryRentVehicle = (
  { startDate, endDate, vehicleId }: FilterParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_vehicle', { startDate, endDate, vehicleId }],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentVehicle({
        startDate: startDate || '',
        endDate: endDate || '',
        vehicleId: vehicleId || ''
      })

      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
      throw new Error('Failed to fetch data')
    }
  })
}
// export const useQueryHistoryRentDriver = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
//   return useQuery<any>({
//     ...options,
//     queryKey: ['history_rent_driver'],
//     queryFn: async () => {
//       const response = await historyApiRequest.GetListHistoryRentDriver()
//       if (response.status === HttpStatusCode.Ok) {
//         return response.data
//       }
//     }
//   })
// }

export const useQueryHistoryRentDriver = (
  { startDate, endDate, vehicleId }: FilterParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['history_rent_driver', { startDate, endDate, vehicleId }],
    queryFn: async () => {
      const response = await historyApiRequest.GetListHistoryRentDriver({
        startDate: startDate || '',
        endDate: endDate || '',
        vehicleId: vehicleId || ''
      })

      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
      throw new Error('Failed to fetch data')
    }
  })
}

export const useQueryDriverRent = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicle_rent', id],
    queryFn: async () => {
      const response = await historyApiRequest.GetListDriverRent({ id })
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
