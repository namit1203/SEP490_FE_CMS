import { Navigate } from 'react-router-dom'
import { useLocalStorage } from '../utils/localStorage/localStorageService'

interface PrivateRouteProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children }) => {
  const token = useLocalStorage.getLocalStorageData('token')
  const role = useLocalStorage.getLocalStorageData('role')

  if (!token && window.location.pathname !== '/login') {
    return <Navigate to='/login' />
  }

  if (token && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' />
  }

  return <>{children}</>
}

export default PrivateRoute
