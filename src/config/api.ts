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
  USER_PROFILE: {
    GET_DATA: '/api/Auth/userProfile'
  }
})
