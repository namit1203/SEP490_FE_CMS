export interface DataType {
  key: string
  name?: string
  numberSeat?: number
  startTime?: number | string
  price?: number
  status?: boolean | string // For "Đã thanh toán" type values
  description?: string
  licensePlate?: string // Corrected from "licsenceVehicle"
  pointStart?: string
  pointEnd?: string
  driverId?: number
  codePromotion?: string
  discount?: string
  endDate?: string
  exchangePoint?: number
  imagePromotion?: string
  startDate?: string
  vehicleId?: number
  licsenceVehicle?: string // Kept for compatibility, though it duplicates licensePlate
  note?: string
  image?: string
  pricePromotion?: number
  typeOfPayment?: string
  fullName?: string
  userId?: number // Added
  tripId?: number // Added
  seatCode?: string | null // Added
  timeFrom?: string // Added
  timeTo?: string // Added
}

export interface DataTypeVehicle {
  type: string
  id: number | any
  driverName: string
  image: string
  numberSeat: number
  vehicleTypeId: number
  status: boolean
  driverId: number
  vehicleOwner: number
  licensePlate: string
  description: string
  createdAt: string // ISO Date string
  createdBy: number | null // Nullable field
  updateAt: string // ISO Date string
  updateBy: number | null // Nullable field
  licsenceVehicle?: string
  note?: string
}

export interface DataTypeCost {
  id: number | any
  key: string
  description: string
  createdAt: number
  updateAt: number
  status: boolean
}
export interface DataTypeFixedCost {
  id: number | any
  dateIncurred: string // ISO Date string
  description: string
  licensePlate: string
  lossCostType: string | null // Nullable field
  price: number
  vehicleId: number
  lossCostTypeId?: number
  vehicleOwner: string | null // Nullable field
  vehicleOwnerId: number
}

export interface DataTypeRequest {
  requestId: number
  ticketId: number | null // Nullable field
  vehicleId: number | any
  driverId: number
  note: string | null // Nullable field
  typeRequestId: number
  typeName: string
  startLocation: string
  endLocation: string
  startTime: string // ISO Date string
  endTime: string // ISO Date string
  seats: number | null // Nullable field
  price: number
  username: string
  phoneNumber: string
  promotionCode: string
}
