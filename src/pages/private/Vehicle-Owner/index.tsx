import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryVehiclesOwner } from '@/queries/vehicle'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: number
  liscenseVehicle: string
  pricePromotion: number
  typeOfPayment: string
  typeOfTicket: string
  vehicleId: number
  vehicleOwner: string
  createdAt: string // ISO string for date-time
}

const VehicleOwnerPage: React.FC = () => {
  const { data, isLoading } = useQueryVehiclesOwner()

  const emptyValue = (value: any) => {
    return <span>{value === null || value === undefined ? '(Không)' : value}</span>
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      ...useColumnSearch().getColumnSearchProps('username'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ...useColumnSearch().getColumnSearchProps('fullName'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      ...useColumnSearch().getColumnSearchProps('email'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Sđt',
      dataIndex: 'numberPhone',
      key: 'numberPhone',
      ...useColumnSearch().getColumnSearchProps('numberPhone'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      ...useColumnSearch().getColumnSearchProps('role'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
      render: (status: boolean) => <span>{status ? 'Đã xác nhận' : 'Chưa xác nhận'}</span>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm title='Are you sure to lock this item?' okText='Yes' cancelText='No'>
            <Button type='primary' danger>
              Lock
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const dataSource =
    data?.map((item: any) => ({
      ...item,
      key: item?.id || item?.someUniqueField || ''
    })) || []

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default VehicleOwnerPage
