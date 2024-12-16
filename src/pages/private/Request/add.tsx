import { RoleType } from '@/enums/enum'
import { useQueryUserProfile } from '@/queries/user-profile'
import React from 'react'
import AddRequestDriverOwner from './AddDriverOwner'
import AddRequestVehicleOwner from './AddVehicleOwner'

const AddRequestRentVehiclePage: React.FC = () => {
  const { data: account } = useQueryUserProfile()

  return <>{account?.role === RoleType.DRIVER ? <AddRequestDriverOwner /> : <AddRequestVehicleOwner />}</>
}

export default AddRequestRentVehiclePage
