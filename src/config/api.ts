export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/api/Auth/login',
    LOGIN_DRIVER: '/loginDriver'
  },
  TRIPS: {
    GET_TRIPS: '/api/Trip',
    GET_TYPE_OF_TRIPS: '/api/TypeOfTrip',
    ADD_TRIP: '/api/Trip/addTrip',
    ADD_TRIP_DETAIL: ({ id }: { id: string | number | null }) => `/api/TripDetails/addTripDetails/${id}`,
    UPDATE_TRIPS: ({ id }: { id: string | number | null }) => `/api/Trip/updateTrip/${id}`,
    UPDATE_STATUS_TRIP: ({ id }: { id: string | number | null }) => `/api/Trip/updateStatusTrip/${id}`,
    GET_TRIP_DETAIL: ({ id }: { id: string | number | null }) => `/api/Trip/getListTripById/${id}`,
    IMPORT_TRIPS: ({ typeOfTrip }: { typeOfTrip: string | number | null }) =>
      `/api/Trip/importTrip/typeOfTrip?typeOfTrip=${typeOfTrip}`,
    CONFIRM_IMPORT_TRIPS: ({ typeOfTrip }: { typeOfTrip: string | number | null }) =>
      `/api/Trip/confirmImportTrip/typeOfTrip?typeOfTrip=${typeOfTrip}`
  },
  TRIP_DETAIL: {
    ADD_TRIP_DETAIL: ({ id }: { id: string | number | null }) => `/api/TripDetails/addTripDetails/${id}`,
    UPDATE_TRIP_DETAIL: ({ id, tripID }: { id: string | number | null; tripID: string | number | null }) =>
      `/api/TripDetails/updateTripDetails/${tripID}/${id}`,
    GET_LIST_TRIP_DETAIL: ({ id }: { id: string | number | null }) => `/api/TripDetails/tripId?TripId=${id}`,
    GET_TRIP_DETAIL_ID: ({ id }: { id: string | number | null }) => `/api/TripDetails/GetTripDetailData/${id}`
  },
  VEHICLES: {
    GET_NO_TRIPS: '/api/Vehicle/VehicleNoTrip',
    GET_VEHICLES: '/api/Vehicle/listVehicle',
    GET_VEHICLES_OWNER: '/api/User/listVehicleOwner',
    DELETE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/deleteVehicleByStatus/${id}`,
    DELETE_VEHICLES_OWNER: ({ id }: { id: string | number | null }) => `/api/Account/deleteVehicleOwner/${id}`,
    ADD_VEHICLES_STAFF: ({ id, isApprove }: { id: string | number | null; isApprove: boolean }) =>
      `/api/Vehicle/addVehicleByStaff?requestID=${id}&isApprove=${isApprove}`,
    VEHICLES_DETAILS: ({ id }: { id: string | number | null }) => `/api/Vehicle/getInforVehicle/${id}`,
    UPDATE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/updateVehicleInformation/${id}`,
    ADD_VEHICLES: '/api/Vehicle/addVehicle',
    TYPE_OF_VEHICLES: '/api/Vehicle/listVehicleType',
    TYPE_VEHICLES_OWNER: '/api/Account/listVehicleOwner',
    IMPORT_VEHICLE: '/api/Vehicle/import_vehicle',
    EXPORT_VEHICLE: '/api/Vehicle/export_template_vehicel',
    ADD_VEHICLES_FROM_EXCEL: '/api/Vehicle/confirmImportVehicle'
  },
  VEHICLES_USING: {
    GET: '/api/Vehicle/getVehicleByDriverId'
  },
  PROMOTION: {
    GET_PROMOTION: '/api/Promotion',
    DELETE_PROMOTION: ({ id }: { id: string | number | null }) => `/api/Promotion/deletePromotion/id?id=${id}`,
    UPDATE_PROMOTION: ({ id }: { id: string | number | null }) => `/api/Promotion/updatePromotion/id?id=${id}`,
    PROMOTION_DETAILS: ({ id }: { id: string | number | null }) => `/api/Promotion/getPromotionById/${id}`,
    ADD_PROMOTION: '/api/Promotion/CreatePromotion',
    ADD_PROMOTION_ALL_USER: '/api/Promotion/givePromotionAllUser'
  },
  DRIVER: {
    GET_DRIVER: '/api/Driver',
    DELETE_DRIVER: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    DRIVER_DETAILS: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    BLOCK_DRIVER: ({ id }: { id: string | number | null }) => `/api/Driver/banDrive/${id}`,
    UPDATE_DRIVER: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    ADD_DRIVER: '/api/Driver'
  },
  LOSS_COST_VEHICLE: {
    GET_COST: '/api/LossCostVehicle/totalLossVehicel',
    DELETE_COST: ({ id }: { id: string | number | null }) => `/api/LossCostVehicle/deleteLossCost/id?id=${id}`,
    UPDATE_COST: ({ id }: { id: string | number | null }) => `/api/LossCostVehicle/updateLossCost/id?id=${id}`,
    ADD_COST: '/api/LossCostVehicle/addLossCostVehicle'
  },
  COST_TYPE: {
    GET_COST_TYPE: '/api/LossCostType/listLossCostType',
    ADD_COST_TYPE: '/api/LossCostType/addLossCostType',
    DELETE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/updateStatusLossCostType/${id}`,
    UPDATE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/updateLossCostType/${id}`
  },
  REQUEST: {
    GET_REQUEST: '/api/Request',
    CREATE_REQUEST_DRIVER: '/api/Request/CreateRentVehicleForDriverRequest',
    CREATE_REQUEST_OWNER: '/api/Request/CreateRentDriverForOwnerRequest',
    REQUEST_DETAILS: ({ id }: { id: string | number | null }) => `/GetRequestDetailById/${id}`,
    ACCEPT_CANCLE_REQUEST: ({ id }: { id: string | number | null }) => `/api/Request/acceptCancleTicket/${id}`,
    DELETE_REQUEST: ({ id }: { id: string | number | null }) => `/api/Request/Delete/${id}`,
    UPDATE_CONVENIENT_TRIP: ({
      id,
      choose,
      vehicleId
    }: {
      id: string | number | null
      choose: boolean
      vehicleId: string | number | null
    }) => `/api/Request/ConvenientTripUpdateForStaff?requestId=${id}&choose=${choose}&vehicleId=${vehicleId}`
  },
  TICKET: {
    GET_TICKET: '/api/Ticket',
    GET_TOTAL_TICKET: '/api/Ticket/RevenueTicket',
    CREATE_FOR_RENT_CAR: '/api/Ticket/createTicketForRentCar',
    UPDATE_TICKET: ({ id }: { id: string | number | null }) => `/api/Ticket/updateTicket/${id}`,
    TICKET_DETAILS: ({ id }: { id: string | number | null }) => `/api/Ticket/ticketById/${id}`,
    TICKET_NOT_PAID: ({ id }: { id: string | number | null }) => `/api/Ticket/tickeNotPaid/${id}`,
    DELETE_TICKET: ({ id }: { id: string | number | null }) => `/api/Ticket/deleteTicket/${id}`,
    UPDATE_STATUS_TICKET: ({ id }: { id: string | number | null }) =>
      `/api/Ticket/updateStatusticketNotPaid/id?id=${id}`,
    GET_TRAVEL_CAR_BY_REQUEST: ({
      id,
      startDate,
      endDate
    }: {
      id: string | number | null
      startDate: string | number | null
      endDate: string | number | null
    }) => `/api/Ticket/GetTravelCarByRequest/${id}/startDate/endDate?startDate=${startDate}&endDate=${endDate}`
  },
  REVENUE: {
    GET_REVENUE: '/api/Revenue/getRevenue',
    EXPORT_REVENUE: '/api/Revenue/exportRevenue'
  },
  REVIEWS: {
    GET_REVIEW: '/api/Review',
    DELETE_REVIEWS: ({ id }: { id: string | number | null }) => `/api/Review/DeleteReview/${id}`
  },
  ACCOUNT: {
    GET_ACCOUNT: '/api/Account/listAccount',
    GET_ROLE: '/api/Account/listRole',
    ADD_ROLE: '/api/Role/addRole',
    UPDATE_ROLE: ({ id }: { id: string | number | null }) => `/api/Role/updateRole/id?id=${id}`,
    UPDATE_VEHICLE_OWNER: ({ id }: { id: string | number | null }) => `/api/Account/updateVehicleOwner/${id}`,
    DELETE_ROLE: ({ id }: { id: string | number | null }) => `/api/Role/deleteRole/id?id=${id}`,
    GET_ACCOUNT_DETAILS: ({ id }: { id: string | number | null }) => `/api/Account/detailsAccount/${id}`,
    DELETE_ACCOUNT: ({ id }: { id: string | number | null }) => `/api/Account/deleteAccount/id?id=${id}`,
    UPDATE_ACCOUNT: ({ id, newRoleId }: { id: string | number | null; newRoleId: string | number | null }) =>
      `/api/Account/updateAccount/userId/newRoleId?userId=${id}&newRoleId=${newRoleId}`
  },
  HISTORY_RENT_VEHICLE: {
    GET_HISTORY_RENT_VEHICLE: '/api/HistoryRentVehicle/listHistoryRentVehicle',
    GET_LIST_VEHICLE_RENT: ({ id }: { id: string | number | null }) =>
      `/api/HistoryRentVehicle/GetVehicleForDriverRent/${id}`,
    GET_LIST_VEHICLE_USE_RENT: ({ date }: { date: string | null }) =>
      `/api/HistoryRentVehicle/listVehicleUseRent/dateTime?date=${date}`,
    ADD_HISTORY_VEHICLE: '/api/HistoryRentVehicle/AddHistoryVehicle'
  },
  HISTORY_RENT_DRIVER: {
    GET_HISTORY_RENT_DRIVER: '/api/HistoryRentDriver/listHistoryRentDriver',
    GET_LIST_DRIVER_RENT: '/api/HistoryRentDriver/ListDriverRent',
    ADD_HISTORY_DRIVER: '/api/HistoryRentDriver/AddHistoryDriver'
  },
  USER_PROFILE: {
    GET_DATA: '/api/Auth/userProfile',
    UPDATE_DATA: '/api/User/EditProfile'
  }
})
