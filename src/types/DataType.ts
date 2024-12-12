export interface DataType {
  key: string
  id: number
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
export interface DataTypeDriver {
  userName: string
  name: string
  numberPhone: string
  password: string
  license: string
  avatar: string
  dob: string // ISO Date string
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
  id?: number
  requestId: number
  ticketId: number | null // Nullable field
  vehicleId: number | any
  driverId: number
  note: string | null // Nullable field
  typeRequestId: string | number | null
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

export interface RequestOption {
  requestId?: number | string | null
  choose?: boolean
  vehicleId?: number
  price?: number
  driverId?: number
}

export interface Field {
  name?: string
  label?: string
  component?: JSX.Element
  rules?: { required: boolean; message: string }[]
  type?: string
  valuePropName?: string
  initialValue?: boolean
}

export interface DataTypeUser {
  id: number
  username: string
  email: string
  numberPhone: string
  password: string
  role: string | number
  avatar: string
  fullName: string
  address: string
  status: boolean
  dob: string // ISO Date string
}
