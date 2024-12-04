import { useRoutes } from 'react-router-dom'
import LoginPage from './pages/public/login'
import TripsPages from './pages/private/trips'
import PrivateLayout from './pages/private'
import UserProfilePage from './pages/private/UserProfile'
import VehiclesPage from './pages/private/Vehicles'
import PromotionPage from './pages/private/Promotion'

export const routesConfig = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: '/trips',
        element: <TripsPages />
      },
      {
        path: '/vehicles',
        element: <VehiclesPage />
      },
      {
        path: '/promotion',
        element: <PromotionPage />
      },
      {
        path: '/user-profile',
        element: <UserProfilePage />
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
