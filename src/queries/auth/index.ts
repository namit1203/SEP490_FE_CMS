import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '../../constants/httpStatusCode.enum'
import { useAuth } from '../../context/AuthContext'
import authApiRequest from '../../services/auth'
import { TLoginAuth } from '../../types/auth'
import { useCookieServices } from '../../utils/cookies/cookieServices'

export const useLoginMutation = (options?: UseMutationOptions<any, unknown, TLoginAuth, unknown>) => {
  const { setIsAuthenticated } = useAuth()
  return useMutation({
    ...options,
    mutationFn: (body: Omit<TLoginAuth, 'login'>) => authApiRequest.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        useCookieServices.setCookie('token', data.data, 7)
      }
    }
  })
}
