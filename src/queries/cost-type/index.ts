import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import costTypeApiRequest from '@/services/cost-type'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useQueryCostType = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['CostType'],
    queryFn: async () => {
      const response = await costTypeApiRequest.GetCostTypes()
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    }
  })
}

export const useAddCostTypeMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<any, 'addCostType'>) => costTypeApiRequest.AddCostType({ body })
  })
}

export const useUpdateCostTypeMutation = (
  options?: UseMutationOptions<any, unknown, { id: string | number; body: any }, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: ({ id, body }: { id: string | number; body: any }) => costTypeApiRequest.UpdateCostType({ id, body })
  })
}

export const useDeleteCostTypeMutation = (options?: UseMutationOptions<any, unknown, any, unknown>) => {
  return useMutation({
    ...options,
    mutationFn: ({ id }: { id: string | number | null }) => costTypeApiRequest.DeleteCostType({ id })
  })
}
