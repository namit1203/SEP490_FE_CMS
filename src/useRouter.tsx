import { RouteObject, useRoutes } from 'react-router-dom'
import { RoleType } from './enums/enum'
import PrivateRoute from './middleware'
import PrivateLayout from './pages/private'
import AccountPage from './pages/private/Account'
import EditAccountPage from './pages/private/Account/edit'
import CostTypePage from './pages/private/CostType'
import AddCostTypePage from './pages/private/CostType/add'
import EditCostTypePage from './pages/private/CostType/edit'
import DriverPage from './pages/private/Driver'
import AddDriverPage from './pages/private/Driver/add'
import EditDriverPage from './pages/private/Driver/edit'
import FixedCostPage from './pages/private/FixedCost'
import AddFixedCostPage from './pages/private/FixedCost/add'
import EditFixedCostPage from './pages/private/FixedCost/edit'
import HistoryRentDriverPage from './pages/private/History-Driver'
import HistoryRentVehiclePage from './pages/private/History-Vehicle'
import PromotionPage from './pages/private/Promotion'
import AddPromotionPage from './pages/private/Promotion/add'
import DetailPromotionPage from './pages/private/Promotion/detail'
import EditPromotionPage from './pages/private/Promotion/edit'
import RequestPage from './pages/private/Request'
import AddRequestRentVehiclePage from './pages/private/Request/add'
import DetailsRequestPage from './pages/private/Request/details'
import RevenuePage from './pages/private/Revenue'
import ReviewsPage from './pages/private/Reviews'
import RolePage from './pages/private/Role'
import AddRolePage from './pages/private/Role/add'
import EditRolePage from './pages/private/Role/edit'
import TicketPage from './pages/private/Ticket'
import TicketNotPaidPage from './pages/private/Ticket-Not-Paid'
import DetailTicketPage from './pages/private/Ticket/detail'
import EditTicketPage from './pages/private/Ticket/edit'
import TotalTicketPage from './pages/private/Total-Ticket'
import TripsPages from './pages/private/trips'
import AddTripPage from './pages/private/trips/add'
import EditTripPage from './pages/private/trips/edit'
import ExcelTripPage from './pages/private/trips/excel'
import ListTripDetailPage from './pages/private/trip-list-detail/list-trip-detail'
import UnauthorizedPage from './pages/private/Unauthorized'
import UserProfilePage from './pages/private/UserProfile'
import VehicleOwnerPage from './pages/private/Vehicle-Owner'
import EditVehicleOwnerPage from './pages/private/Vehicle-Owner/edit'
import VehiclesPage from './pages/private/Vehicles'
import AddVehiclePage from './pages/private/Vehicles/add'
import EditVehiclePage from './pages/private/Vehicles/edit'
import ExcelVehiclePage from './pages/private/Vehicles/excel'
import VehicleUsingPage from './pages/private/VehicleUsing'
import LoginPage from './pages/public/login'
import ListTripDetailAddPage from './pages/private/trip-list-detail/list-trip-detail-add'
import ListTripDetailEditPage from './pages/private/trip-list-detail/list-trip-detail-edit'
import EditUserProfile from './pages/private/UserProfile/edit'

const staffRoutes = [
  { path: '/trips', component: <TripsPages />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/add', component: <AddTripPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/excel', component: <ExcelTripPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/edit', component: <EditTripPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/list-trip-detail', component: <ListTripDetailPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/list-trip-detail/add', component: <ListTripDetailAddPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/trips/list-trip-detail/edit', component: <ListTripDetailEditPage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/vehicles',
    component: <VehiclesPage />,
    allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.DRIVER]
  },
  {
    path: '/vehicles-owner',
    component: <VehicleOwnerPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/vehicles-owner/edit',
    component: <EditVehicleOwnerPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/vehicles/add',
    component: <AddVehiclePage />,
    allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER]
  },
  {
    path: '/vehicles/edit',
    component: <EditVehiclePage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/vehicles/excel',
    component: <ExcelVehiclePage />,
    allowedRoles: [RoleType.STAFF]
  },
  { path: '/promotion', component: <PromotionPage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/promotion/add',
    component: <AddPromotionPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/promotion/edit',
    component: <EditPromotionPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/promotion/detail',
    component: <DetailPromotionPage />,
    allowedRoles: [RoleType.STAFF]
  },
  { path: '/driver', component: <DriverPage />, allowedRoles: [RoleType.STAFF, RoleType.ADMIN] },
  { path: '/driver/edit', component: <EditDriverPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/driver/add', component: <AddDriverPage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/history-rent-vehicle',
    component: <HistoryRentVehiclePage />,
    allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.DRIVER]
  },
  {
    path: '/history-rent-driver',
    component: <HistoryRentDriverPage />,
    allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.DRIVER]
  },
  { path: '/cost-type', component: <CostTypePage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/cost-type/edit', // Note: Relative to the parent route
    component: <EditCostTypePage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/cost-type/add', // Note: Relative to the parent route
    component: <AddCostTypePage />,
    allowedRoles: [RoleType.STAFF]
  },
  { path: '/fixed-cost', component: <FixedCostPage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/fixed-cost/edit', // Note: Relative to the parent route
    component: <EditFixedCostPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/fixed-cost/add', // Note: Relative to the parent route
    component: <AddFixedCostPage />,
    allowedRoles: [RoleType.STAFF]
  },
  {
    path: '/request',
    component: <RequestPage />,
    allowedRoles: [RoleType.STAFF, RoleType.ADMIN, RoleType.DRIVER, RoleType.VEHICLE_OWNER]
  },
  {
    path: '/request/details',
    component: <DetailsRequestPage />,
    allowedRoles: [RoleType.STAFF, RoleType.DRIVER, RoleType.VEHICLE_OWNER]
  },
  {
    path: '/request/add',
    component: <AddRequestRentVehiclePage />,
    allowedRoles: [RoleType.DRIVER, RoleType.VEHICLE_OWNER]
  },
  { path: '/revenue', component: <RevenuePage />, allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER] },
  {
    path: '/ticket',
    component: <TicketPage />,
    allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.DRIVER]
  },
  { path: '/total-ticket', component: <TotalTicketPage />, allowedRoles: [RoleType.STAFF, RoleType.VEHICLE_OWNER] },
  { path: '/ticket/detail', component: <DetailTicketPage />, allowedRoles: [RoleType.STAFF, RoleType.DRIVER] },
  { path: '/ticket/edit', component: <EditTicketPage />, allowedRoles: [RoleType.STAFF] },
  { path: '/ticket-not-paid', component: <TicketNotPaidPage />, allowedRoles: [RoleType.STAFF, RoleType.DRIVER] },
  { path: '/reviews', component: <ReviewsPage />, allowedRoles: [RoleType.STAFF] },
  {
    path: '/user-profile',
    component: <UserProfilePage />,
    allowedRoles: [RoleType.ADMIN, RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.USER, RoleType.DRIVER]
  },
  {
    path: '/user-profile/update',
    component: <EditUserProfile />,
    allowedRoles: [RoleType.ADMIN, RoleType.STAFF, RoleType.VEHICLE_OWNER, RoleType.USER, RoleType.DRIVER]
  }
]

const adminRoutes = [
  { path: '/account', component: <AccountPage />, allowedRoles: [RoleType.ADMIN] },
  { path: '/account/edit', component: <EditAccountPage />, allowedRoles: [RoleType.ADMIN] },
  { path: '/role', component: <RolePage />, allowedRoles: [RoleType.ADMIN] },
  { path: '/role/edit', component: <EditRolePage />, allowedRoles: [RoleType.ADMIN] },
  { path: '/role/add', component: <AddRolePage />, allowedRoles: [RoleType.ADMIN] }
]

const driverRoutes = [{ path: '/vehicles-using', component: <VehicleUsingPage />, allowedRoles: [RoleType.DRIVER] }]

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
