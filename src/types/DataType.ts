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
}

export interface DataTypeVehicle {
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
