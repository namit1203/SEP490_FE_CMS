import { Space, Table, TableProps } from 'antd'
import React from 'react'
import { useQueryVehicles } from '../../../queries/vehicle'

interface DataType {
  key: string
  description: string
  licensePlate: string
  numberSeat: number
  status: boolean
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên chuyến đi',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <a>{text}</a>,
    width: '25%'
  },
  {
    title: 'Biển số xe',
    dataIndex: 'licensePlate',
    key: 'licensePlate',
    sorter: (a, b) => a.licensePlate.localeCompare(b.licensePlate),
    width: '25%'
  },
  {
    title: 'Số ghế',
    dataIndex: 'numberSeat',
    key: 'numberSeat',
    sorter: (a, b) => a.numberSeat - b.numberSeat,
    width: '20%'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => Number(a.status) - Number(b.status),
    render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
    width: '20%'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const VehiclesPage: React.FC = () => {
  const { data } = useQueryVehicles()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default VehiclesPage
