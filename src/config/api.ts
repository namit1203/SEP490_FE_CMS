export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/api/Auth/login'
  },
  TRIPS: {
    GET_TRIPS: '/api/Trip',
    UPDATE_TRI: ({ id }: { id: string | number | null }) => `/api/Trip/updateTrip/${id}`
  }
})
