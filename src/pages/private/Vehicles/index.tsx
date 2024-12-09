import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteVehiclesMutation, useQueryVehicles } from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const VehiclesPage: React.FC = () => {
  const { data, refetch: refetchVehicles, isLoading } = useQueryVehicles()

  const deleteMutaion = useDeleteVehiclesMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetchVehicles()
  }, [refetchVehicles])

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetchVehicles()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const columns: TableProps<DataTypeVehicle>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '25%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      ...useColumnSearch().getColumnSearchProps('licensePlate'),
      sorter: (a, b) => handlingTsUndefined(a.licensePlate).localeCompare(handlingTsUndefined(b.licensePlate)),
      align: 'center',
      width: '25%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      sorter: (a, b) => handlingTsUndefined(a.numberSeat) - handlingTsUndefined(b.numberSeat),
      align: 'center',
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => Number(a.status) - Number(b.status),
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
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
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to='add'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Thêm mới
                </Button>
              </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default VehiclesPage
