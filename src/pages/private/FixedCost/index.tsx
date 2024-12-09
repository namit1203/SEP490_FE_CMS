import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatPrize, formatTime, generateFilters } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteLossCostMutation, useQueryLossCost } from '@/queries/fixed-cost'
import { DataTypeFixedCost } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const FixedCostPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryLossCost()

  const deleteMutaion = useDeleteLossCostMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || `${item.description}-${item.licensePlate}-${item.dateIncurred}`
  }))

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetch()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const lossCostTypeFilters = data ? generateFilters(data, 'lossCostType') : []

  const columns: TableProps<DataTypeFixedCost>['columns'] = [
    {
      title: 'Tên chi phí',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '20%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: '15%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licensePlate')
    },
    {
      title: 'Chủ xe',
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      width: '20%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner')
    },
    {
      title: 'Loại chi phí',
      dataIndex: 'lossCostType',
      key: 'lossCostType',
      align: 'center',
      width: '20%',
      filters: lossCostTypeFilters,
      onFilter: (value, record) => record.lossCostType === value,
      render: (value) => value || 'N/A'
    },
    {
      title: 'Chi phí',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => a.price - b.price,
      align: 'center',
      width: '10%'
    },
    {
      title: 'Ngày phát sinh',
      dataIndex: 'dateIncurred',
      key: 'dateIncurred',
      align: 'center',
      sorter: (a, b) => Date.parse(a.dateIncurred) - Date.parse(b.dateIncurred),
      render: (date) => <span>{formatTime(date)}</span>,
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
            onConfirm={() => handleFormDelete(record.id)}
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
export default FixedCostPage
