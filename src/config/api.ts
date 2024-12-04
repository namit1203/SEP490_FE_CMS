export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/api/Auth/login'
  },
  TRIPS: {
    GET_TRIPS: '/api/Trip',
    UPDATE_TRIPS: ({ id }: { id: string | number | null }) => `/api/Trip/updateTrip/${id}`
  },
  VEHICLES: {
    GET_VEHICLES: '/api/Vehicle/listVehicle',
    DELETE_VEHICLES: ({ id }: { id: string | number | null }) => `/api/Vehicle/deleteVehicleByStatus/${id}`,
    VEHICLES_DETAILS: ({ id }: { id: string | number | null }) => `/api/Vehicle/getInforVehicle/${id}`,
    ADD_VEHICLES: '/api/Vehicle/addVehicle'
  },
  PROMOTION: {
    GET_PROMOTION: '/api/Promotion',
    DELETE_PROMOTION: ({ id }: { id: string | number | null }) => `/api/Promotion/${id}`,
    PROMOTION_DETAILS: ({ id }: { id: string | number | null }) => `/api/Promotion/getPromotionById/${id}`,
    ADD_PROMOTION: '/api/Promotion/CreatePromotion'
  },
  DRIVER: {
    GET_DRIVER: '/api/Driver',
    DELETE_DRIVER: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    DRIVER_DETAILS: ({ id }: { id: string | number | null }) => `/api/Driver/${id}`,
    ADD_DRIVER: '/api/Driver/Driver'
  },
  LOSS_COST_VEHICLE: {
    GET_COST: '/api/LossCostVehicle/lossCostCar/vehicleId/startDate/endDate',
    DELETE_COST: ({ id }: { id: string | number | null }) => `/api/LossCostVehicle/deleteLossCost/id?id=${id}`,
    ADD_COST: '/api/LossCostVehicle/addLossCostVehicle'
  },
  COST_TYPE: {
    GET_COST_TYPE: '/api/LossCostType/listLossCostType',
    ADD_COST_TYPE: '/api/LossCostType/addLossCostType',
    DELETE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/deleteLossCostType/${id}`,
    UPDATE_COST_TYPE: ({ id }: { id: string | number | null }) => `/api/LossCostType/updateLossCostType/${id}`
  },
  USER_PROFILE: {
    GET_DATA: '/api/Auth/userProfile'
  }
})
