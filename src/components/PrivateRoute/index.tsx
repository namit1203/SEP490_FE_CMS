import { Navigate } from 'react-router-dom'
import { useLocalStorage } from '../../utils/localStorage/localStorageService'

interface PrivateRouteProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children }) => {
  const token = useLocalStorage.getLocalStorageData('token')
  const user = {
    role: 'Staff' //Admin,Staff ,VehicleOwner,User
  }

  if (!token) {
    return <Navigate to='/login' />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />
  }

  return <>{children}</>
}

export default PrivateRoute
