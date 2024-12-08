export interface DataType {
  key: string
  name?: string
  numberSeat?: number
  startTime?: number
  price?: number
  status?: boolean
  description?: string
  licensePlate?: string
  pointStart?: string
  pointEnd?: string
  driverId?: number
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
}

export interface DataTypeCost {
  id: number | any
  key: string
  description: string
  createdAt: number
  updateAt: number
  status: boolean
}
