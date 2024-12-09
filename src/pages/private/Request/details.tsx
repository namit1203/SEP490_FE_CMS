import { ActionType } from '@/enums/enum'
import { useQueryRequestDetails } from '@/queries/request'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import AddVehicleForm from './type_1'
import RentVehicleForm from './type_2'
import RentDriverForm from './type_4'

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
      default:
        return <p>Không tìm thấy loại yêu cầu phù hợp.</p>
    }
  }

  return <>{renderComponent()}</>
}

export default DetailsRequestPage
