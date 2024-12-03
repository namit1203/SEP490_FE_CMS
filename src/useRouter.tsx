import { useRoutes } from 'react-router-dom'
import LoginPage from './pages/public/login'
import TripsPages from './pages/private/trips'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <TripsPages />
    }
  ]) // thêm các router vào đây
  return routeElements
}
