import { useRoutes } from 'react-router-dom'
import LoginPage from './pages/public/login'
import TripsPages from './pages/private/trips'
import PrivateLayout from './pages/private'

export const routesConfig = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: '/trips',
        element: <TripsPages />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <TripsPages />
  }
]

export default function useRouteElements() {
  const routeElements = useRoutes(routesConfig) // thêm các router vào đây
  return routeElements
}
