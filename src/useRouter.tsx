import { useRoutes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PrivateLayout from './pages/private'
import AccountPage from './pages/private/Account'
import CostTypePage from './pages/private/CostType'
import DriverPage from './pages/private/Driver'
import FixedCostPage from './pages/private/FixedCost'
import PromotionPage from './pages/private/Promotion'
import RequestPage from './pages/private/Request'
import ReviewsPage from './pages/private/Reviews'
import RolePage from './pages/private/Role'
import TicketPage from './pages/private/Ticket'
import TripsPages from './pages/private/trips'
import UnauthorizedPage from './pages/private/Unauthorized'
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
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <TripsPages />
          </PrivateRoute>
        )
      },
      {
        path: '/vehicles',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <VehiclesPage />
          </PrivateRoute>
        )
      },
      {
        path: '/promotion',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <PromotionPage />
          </PrivateRoute>
        )
      },
      {
        path: '/driver',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <DriverPage />
          </PrivateRoute>
        )
      },
      {
        path: '/cost-type',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <CostTypePage />
          </PrivateRoute>
        )
      },
      {
        path: '/fixed-cost',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <FixedCostPage />
          </PrivateRoute>
        )
      },
      {
        path: '/request',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <RequestPage />
          </PrivateRoute>
        )
      },
      {
        path: '/ticket',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <TicketPage />
          </PrivateRoute>
        )
      },
      {
        path: '/reviews',
        element: (
          <PrivateRoute allowedRoles={['Staff']}>
            <ReviewsPage />
          </PrivateRoute>
        )
      },
      {
        path: '/account',
        element: (
          <PrivateRoute allowedRoles={['Admin']}>
            <AccountPage />
          </PrivateRoute>
        )
      },
      {
        path: '/role',
        element: (
          <PrivateRoute allowedRoles={['Admin']}>
            <RolePage />
          </PrivateRoute>
        )
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
    path: '/unauthorized',
    element: <UnauthorizedPage />
  }
]

export default function useRouteElements() {
  const routeElements = useRoutes(routesConfig) // thêm các router vào đây
  return routeElements
}
