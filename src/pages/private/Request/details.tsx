import { ActionType } from '@/enums/enum'
import { useQueryRequestDetails } from '@/queries/request'
import { useQueryUserProfile } from '@/queries/user-profile'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AddVehicleForm from './AddVehicleForm'
import RentCarForDriver from './RentCarForDriver'
import RentDriverForm from './RentDriverForm'
import RentOrBookCar from './RentOrBookCar'
import RentVehicleForm from './RentVehicleForm'

const DetailsRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const requestID = searchParams.get('id')

  const { data, isLoading, error, refetch } = useQueryRequestDetails({ id: requestID })

  const { data: account } = useQueryUserProfile()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return <p>Đang tải...</p>
  if (error) return <p>Có lỗi xảy ra: {error.message}</p>
  if (!data) return <p>Không tìm thấy dữ liệu yêu cầu.</p>

  const componentsMap: Partial<Record<ActionType, React.ReactNode>> = {
    [ActionType.ADD_VEHICLE]: <AddVehicleForm data={data} />,
    [ActionType.RENT_VEHICLE]: <RentVehicleForm data={data} />,
    [ActionType.RENT_DRIVER]: <RentDriverForm data={data} />,
    [ActionType.RENT_TRIP]: <RentOrBookCar data={data} />,
    [ActionType.CHARTER_TRIP]: <RentOrBookCar data={data} />,
    [ActionType.DRIVER_RENT_VEHICLE]: <RentCarForDriver data={data} account={account} />
  }

  return componentsMap[data.typeRequestId as ActionType] || <p>Không tìm thấy loại yêu cầu phù hợp.</p>
}

export default DetailsRequestPage
