export enum ActionType {
  ADD_VEHICLE = 1,
  RENT_VEHICLE = 2,
  CANCEL_TICKET = 3,
  RENT_DRIVER = 4,
  RENT_TRIP = 5,
  CHARTER_TRIP = 6,
  DRIVER_RENT_VEHICLE = 7
}

export const ActionTypeDescriptions: Record<ActionType, string> = {
  [ActionType.ADD_VEHICLE]: 'Thêm xe vào hệ thống',
  [ActionType.RENT_VEHICLE]: 'Thuê xe du lịch',
  [ActionType.CANCEL_TICKET]: 'Hủy vé xe',
  [ActionType.RENT_DRIVER]: 'Thuê tài xế',
  [ActionType.RENT_TRIP]: 'Thuê xe tiện chuyến',
  [ActionType.CHARTER_TRIP]: 'Bao xe tiện chuyến',
  [ActionType.DRIVER_RENT_VEHICLE]: 'Lái xe muốn thuê xe'
}
