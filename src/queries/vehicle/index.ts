import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import vehicleApiRequest from '@/services/vehicle'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryVehicles = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehicles()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryVehiclesNoTrip = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles_no_trips'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehiclesNoTrip()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryVehiclesOwner = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles_owner'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehiclesOwner()

      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryTypeOfVehicles = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['type_vehicles'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetTypeOfVehicles()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryTypeVehiclesOwner = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['type_vehicles_owner'],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetTypeOfVehiclesOwner()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryVehiclesDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['vehicles_details', id],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetVehiclesDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryCheckSeatAvailable = (
  { checkDate }: { checkDate: string | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['check_seat', checkDate],
    queryFn: async () => {
      const response = await vehicleApiRequest.GetCheckSeat({ checkDate })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddVehiclesMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addVehicle'>) => vehicleApiRequest.AddVehicles({ body })
  })
}

export const useDeleteVehiclesMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => vehicleApiRequest.DeleteVehicles({ id })
  })
}
export const useDeleteVehiclesOwnerMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => vehicleApiRequest.DeleteVehiclesOwner({ id })
  })
}

export const useUpdateVehiclesMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => vehicleApiRequest.UpdateVehicles({ id, body })
  })
}
export const useUpdateVehiclesOwnerMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) =>
      vehicleApiRequest.UpdateVehiclesOwner({ id, body })
  })
}

export const useImportExcel = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'importExcel'>) => vehicleApiRequest.ImportVehicleExcel({ body })
  })
}

export const useAddVehiclesFromExcelMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addVehicleFromExcel'>) => vehicleApiRequest.AddVehiclesFromExcel({ body })
  })
}
export const useExportVehiclesFromExcelMutation = () => {
  return useMutation({
    mutationFn: () => vehicleApiRequest.ExportVehicleExcel()
  })
}
