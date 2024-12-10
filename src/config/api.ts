export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/api/Auth/login',
    LOGIN_DRIVER: '/loginDriver'
  },
  TRIPS: {
    GET_TRIPS: '/api/Trip',
    UPDATE_TRIPS: ({ id }: { id: string | number | null }) => `/api/Trip/updateTrip/${id}`
  },
  VEHICLES: {
    GET_VEHICLES: '/api/Vehicle/listVehicle',
    DELETE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/deleteVehicleByStatus/${id}`,
    ADD_VEHICLES_STAFF: ({ id, isApprove }: { id: string | number | null; isApprove: boolean }) =>
      `/api/Vehicle/addVehicleByStaff?requestID=${id}&isApprove=${isApprove}`,
    VEHICLES_DETAILS: ({ id }: { id: string | number | null }) => `/api/Vehicle/getInforVehicle/${id}`,
    UPDATE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/updateVehicleInformation/${id}`,
    ADD_VEHICLES: '/api/Vehicle/addVehicle',
    TYPE_OF_VEHICLES: '/api/Vehicle/listVehicleType',
    TYPE_VEHICLES_OWNER: '/api/Account/listVehicleOwner'
  },
  VEHICLES_USING: {
    GET: '/api/Vehicle/getVehicleByDriverId'
  },
  PROMOTION: {
    GET_PROMOTION: '/api/Promotion',
    DELETE_PROMOTION: ({ id }: { id: string | number | null }) => `/api/Promotion/deletePromotion/id?id=${id}`,
    PROMOTION_DETAILS: ({ id }: { id: string | number | null }) => `/api/Promotion/getPromotionById/${id}`,
    ADD_PROMOTION: '/api/Promotion/CreatePromotion',
    ADD_PROMOTION_ALL_USER: '/api/Promotion/givePromotionAllUser'
  },
  DRIVER: {
    GET_DRIVER: '/api/Driver',
    DELETE_DRIVER: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    DRIVER_DETAILS: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    ADD_DRIVER: '/api/Driver/Driver'
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
    DELETE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/deleteLossCostType/${id}`,
    UPDATE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/updateLossCostType/${id}`
  },
  REQUEST: {
    GET_REQUEST: '/api/Request',
    CREATE_REQUEST_DRIVER: '/api/Request/CreateRentVehicleForDriverRequest',
    REQUEST_DETAILS: ({ id }: { id: string | number | null }) => `/GetRequestDetailById/${id}`,
    ACCEPT_CANCLE_REQUEST: ({ id }: { id: string | number | null }) => `/api/Request/acceptCancleTicket/${id}`,
    UPDATE_CONVENIENT_TRIP: ({ id, choose }: { id: string | number | null; choose: boolean }) =>
      `/api/Request/ConvenientTripUpdateForStaff?requestId=${id}&choose=${choose}`
  },
  TICKET: {
    GET_TICKET: '/api/Ticket',
    CREATE_FOR_RENT_CAR: '/api/Ticket/createTicketForRentCar',
    UPDATE_TICKET: ({ id }: { id: string | number | null }) => `/api/Ticket/updateTicket/${id}`,
    TICKET_DETAILS: ({ id }: { id: string | number | null }) => `/api/Ticket/ticketById/${id}`,
    TICKET_NOT_PAID: ({ id }: { id: string | number | null }) => `/api/Ticket/tickeNotPaid/${id}`,
    DELETE_TICKET: ({ id }: { id: string | number | null }) => `/api/Ticket/deleteTicketTimeOut/${id}`,
    UPDATE_STATUS_TICKET: ({ id }: { id: string | number | null }) => `/api/Ticket/updateStatusticketNotPaid/${id}`,
    GET_TRAVEL_CAR_BY_REQUEST: ({ id }: { id: string | number | null }) => `/api/Ticket/GetTravelCarByRequest/${id}`
  },
  REVENUE: {
    GET_REVENUE: '/api/Revenue/getRevenue'
  },
  REVIEWS: {
    GET_REVIEW: '/api/Review',
    DELETE_REVIEWS: ({ id }: { id: string | number | null }) => `/api/Review/DeleteReview/${id}`
  },
  ACCOUNT: {
    GET_ACCOUNT: '/api/Account/listAccount',
    GET_ROLE: '/api/Account/listRole',
    GET_ACCOUNT_DETAILS: ({ id }: { id: string | number | null }) => `/api/Account/detailsAccount/${id}`
  },
  HISTORY_RENT_VEHICLE: {
    GET_HISTORY_RENT_VEHICLE: '/api/HistoryRentVehicle/listHistoryRentVehicle',
    GET_LIST_VEHICLE_RENT: '/api/HistoryRentVehicle/ListVehicleUseRent',
    ADD_HISTORY_VEHICLE: '/api/HistoryRentVehicle/AddHistoryVehicle'
  },
  HISTORY_RENT_DRIVER: {
    GET_HISTORY_RENT_DRIVER: '/api/HistoryRentDriver/listHistoryRentDriver',
    GET_LIST_DRIVER_RENT: '/api/HistoryRentDriver/ListDriverRent',
    ADD_HISTORY_DRIVER: '/api/HistoryRentDriver/AddHistoryDriver'
  },
  USER_PROFILE: {
    GET_DATA: '/api/Auth/userProfile'
  }
})
