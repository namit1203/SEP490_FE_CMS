import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useAuth } from '@/context/AuthContext'
import authApiRequest from '@/services/auth'
import { TLoginAuth } from '@/types/auth'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useLoginMutation = (options?: UseMutationOptions<any, unknown, TLoginAuth, unknown>) => {
  const { setIsAuthenticated } = useAuth()
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TLoginAuth, 'login'>) => authApiRequest.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        useLocalStorage.setLocalStorageData('token', data.data.token)
        useLocalStorage.setLocalStorageData('role', data.data.role)
        useLocalStorage.setLocalStorageData('userName', data.data.userName)
        useLocalStorage.setLocalStorageData('id', data.data.id)
      }
    }
  })
}
export const useLoginDriverMutation = (options?: UseMutationOptions<any, unknown, TLoginAuth, unknown>) => {
  const { setIsAuthenticated } = useAuth()
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TLoginAuth, 'login'>) => authApiRequest.LoginDriver({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        useLocalStorage.setLocalStorageData('token', data.data.token)
        useLocalStorage.setLocalStorageData('role', data.data.role)
      }
    }
  })
}
