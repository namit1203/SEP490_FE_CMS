import { ActionType } from '@/enums/enum'
import { useQueryRequestDetails } from '@/queries/request'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import AddVehicleForm from './AddVehicleForm'
import RentVehicleForm from './RentVehicleForm'
import RentDriverForm from './RentDriverForm'
import RentOrBookCar from './RentOrBookCar'
import RentCarForDriver from './RentCarForDriver'

const DetailsRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const requestID = searchParams.get('id')

  const { data } = useQueryRequestDetails({ id: requestID })

  const renderComponent = () => {
    switch (data?.typeRequestId) {
      case ActionType.ADD_VEHICLE:
        return <AddVehicleForm data={data} />
      case ActionType.RENT_VEHICLE:
        return <RentVehicleForm data={data} />
      case ActionType.RENT_DRIVER:
        return <RentDriverForm data={data} />
      case ActionType.RENT_TRIP || ActionType.CHARTER_TRIP:
        return <RentOrBookCar data={data} />
      case ActionType.DRIVER_RENT_VEHICLE:
        return <RentCarForDriver data={data} />
      default:
        return <p>Không tìm thấy loại yêu cầu phù hợp.</p>
    }
  }

  return <>{renderComponent()}</>
}

export default DetailsRequestPage
