import { useRoutes } from 'react-router-dom'
import PrivateLayout from './pages/private'
import CostTypePage from './pages/private/CostType'
import DriverPage from './pages/private/Driver'
import FixedCostPage from './pages/private/FixedCost'
import PromotionPage from './pages/private/Promotion'
import TripsPages from './pages/private/trips'
import UserProfilePage from './pages/private/UserProfile'
import VehiclesPage from './pages/private/Vehicles'
import LoginPage from './pages/public/login'

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
        path: '/driver',
        element: <DriverPage />
      },
      {
        path: '/cost-type',
        element: <CostTypePage />
      },
      {
        path: '/fixed-cost',
        element: <FixedCostPage />
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
