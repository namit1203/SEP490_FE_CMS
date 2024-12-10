import { RouteObject, useRoutes } from 'react-router-dom'
import PrivateRoute from './middleware'
import PrivateLayout from './pages/private'
import AccountPage from './pages/private/Account'
import CostTypePage from './pages/private/CostType'
import AddCostTypePage from './pages/private/CostType/add'
import EditCostTypePage from './pages/private/CostType/edit'
import DriverPage from './pages/private/Driver'
import FixedCostPage from './pages/private/FixedCost'
import AddFixedCostPage from './pages/private/FixedCost/add'
import EditFixedCostPage from './pages/private/FixedCost/edit'
import HistoryRentDriverPage from './pages/private/History-Driver'
import HistoryRentVehiclePage from './pages/private/History-Vehicle'
import PromotionPage from './pages/private/Promotion'
import AddPromotionPage from './pages/private/Promotion/add'
import EditPromotionPage from './pages/private/Promotion/edit'
import RequestPage from './pages/private/Request'
import DetailsRequestPage from './pages/private/Request/details'
import ReviewsPage from './pages/private/Reviews'
import RolePage from './pages/private/Role'
import TicketPage from './pages/private/Ticket'
import TicketNotPaidPage from './pages/private/Ticket-Not-Paid'
import TripsPages from './pages/private/trips'
import UnauthorizedPage from './pages/private/Unauthorized'
import UserProfilePage from './pages/private/UserProfile'
import VehiclesPage from './pages/private/Vehicles'
import AddVehiclePage from './pages/private/Vehicles/add'
import EditVehiclePage from './pages/private/Vehicles/edit'
import VehicleUsingPage from './pages/private/VehicleUsing'
import LoginPage from './pages/public/login'
import DetailPromotionPage from './pages/private/Promotion/detail'
import DetailTicketPage from './pages/private/Ticket/detail'
import EditTicketPage from './pages/private/Ticket/edit'

const staffRoutes = [
  { path: '/trips', component: <TripsPages />, allowedRoles: ['Staff'] },
  {
    path: '/vehicles',
    component: <VehiclesPage />,
    allowedRoles: ['Staff', 'VehicleOwner', 'Driver']
  },
  {
    path: '/vehicles/add',
    component: <AddVehiclePage />,
    allowedRoles: ['Staff']
  },
  {
    path: '/vehicles/edit',
    component: <EditVehiclePage />,
    allowedRoles: ['Staff']
  },
  { path: '/promotion', component: <PromotionPage />, allowedRoles: ['Staff'] },
  {
    path: '/promotion/add',
    component: <AddPromotionPage />,
    allowedRoles: ['Staff']
  },
  {
    path: '/promotion/edit',
    component: <EditPromotionPage />,
    allowedRoles: ['Staff']
  },
  {
    path: '/promotion/detail',
    component: <DetailPromotionPage />,
    allowedRoles: ['Staff']
  },
  { path: '/driver', component: <DriverPage />, allowedRoles: ['Staff', 'Admin'] },
  {
    path: '/history-rent-vehicle',
    component: <HistoryRentVehiclePage />,
    allowedRoles: ['Staff', 'VehicleOwner', 'Driver']
  },
  {
    path: '/history-rent-driver',
    component: <HistoryRentDriverPage />,
    allowedRoles: ['Staff', 'VehicleOwner', 'Driver']
  },
  { path: '/cost-type', component: <CostTypePage />, allowedRoles: ['Staff'] },
  {
    path: '/cost-type/edit', // Note: Relative to the parent route
    component: <EditCostTypePage />,
    allowedRoles: ['Staff']
  },
  {
    path: '/cost-type/add', // Note: Relative to the parent route
    component: <AddCostTypePage />,
    allowedRoles: ['Staff']
  },
  { path: '/fixed-cost', component: <FixedCostPage />, allowedRoles: ['Staff'] },
  {
    path: '/fixed-cost/edit', // Note: Relative to the parent route
    component: <EditFixedCostPage />,
    allowedRoles: ['Staff']
  },
  {
    path: '/fixed-cost/add', // Note: Relative to the parent route
    component: <AddFixedCostPage />,
    allowedRoles: ['Staff']
  },
  { path: '/request', component: <RequestPage />, allowedRoles: ['Staff', 'Admin', 'Driver'] },
  { path: '/request/details', component: <DetailsRequestPage />, allowedRoles: ['Staff', 'Admin', 'Driver'] },
  { path: '/ticket', component: <TicketPage />, allowedRoles: ['Staff'] },
  { path: '/ticket/detail', component: <DetailTicketPage />, allowedRoles: ['Staff'] },
  { path: '/ticket/edit', component: <EditTicketPage />, allowedRoles: ['Staff'] },
  { path: '/ticket-not-paid', component: <TicketNotPaidPage />, allowedRoles: ['Staff', 'Driver'] },
  { path: '/reviews', component: <ReviewsPage />, allowedRoles: ['Staff'] },
  {
    path: '/user-profile',
    component: <UserProfilePage />,
    allowedRoles: ['Admin', 'Staff', 'VehicleOwner', 'User', 'Driver']
  }
]

const adminRoutes = [
  { path: '/account', component: <AccountPage />, allowedRoles: ['Admin'] },
  { path: '/role', component: <RolePage />, allowedRoles: ['Admin'] }
]

const driverRoutes = [{ path: '/vehicles-using', component: <VehicleUsingPage />, allowedRoles: ['Driver'] }]

const routeGenerator = (
  routes: {
    path: string
    component: React.ReactNode
    allowedRoles: string[]
  }[]
): RouteObject[] => {
  return routes.map((route) => ({
    path: route.path,
    element: <PrivateRoute allowedRoles={route.allowedRoles}>{route.component}</PrivateRoute>
  }))
}

export const routesConfig = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [...routeGenerator(driverRoutes), ...routeGenerator(staffRoutes), ...routeGenerator(adminRoutes)]
  },
  {
    path: '/login',
    element: (
      <PrivateRoute allowedRoles={[]}>
        <LoginPage />
      </PrivateRoute>
    )
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />
  }
]

export default function useRouteElements() {
  const routeElements = useRoutes(routesConfig)
  return routeElements
}
