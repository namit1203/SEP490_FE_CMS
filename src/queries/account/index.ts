import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import accountApiRequest from '@/services/account'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryAccount = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['account'],
    queryFn: async () => {
      const response = await accountApiRequest.GetListAccount()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}
export const useQueryRole = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['account_role'],
    queryFn: async () => {
      const response = await accountApiRequest.GetListRole()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useQueryAccountDetails = (
  { id }: { id: string | number | null },
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['Account_details', id],
    queryFn: async () => {
      const response = await accountApiRequest.GetAccountDetails({ id })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useUpdateRoleAccountMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; newRoleId: string | number }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, newRoleId }: { id: string | number; newRoleId: string | number }) =>
      accountApiRequest.UpdateRoleAccount({ id, newRoleId })
  })
}
export const useUpdateRoleMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => accountApiRequest.UpdateRole({ id, body })
  })
}

export const useAddRoleMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addLossCost'>) => accountApiRequest.AddRole({ body })
  })
}

export const useAddVehicleOwner = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addLossCost'>) => accountApiRequest.AddVehicleOwner({ body })
  })
}

export const useDeleteAccountMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => accountApiRequest.DeleteAccount({ id })
  })
}
export const useDeleteRoleAccountMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number | null }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => accountApiRequest.DeleteRole({ id })
  })
}
