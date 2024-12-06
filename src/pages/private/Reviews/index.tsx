import { formatDate } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryReviews } from '@/queries/reviews'
import { useQueryTrips } from '@/queries/trip'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  id: number
  tripId: number
  createdAt: number
  updateAt: number
  description: string
}

const ReviewsPage: React.FC = () => {
  const { data, isLoading } = useQueryReviews()
  const { data: tripData } = useQueryTrips()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tên chuyến đi',
      dataIndex: 'tripId',
      key: 'tripId',
      align: 'center',
      render: (_, record) => <span>{record.tripId}</span>,
      width: '25%'
    },
    {
      title: 'Đánh giá',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '25%'
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date) => <span>{formatDate(date)}</span>,
      width: '25%'
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align: 'center',
      render: (date) => <span>{formatDate(date)}</span>,
      width: '25%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: () => (
        <Space size='middle'>
          <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField,
    tripId: tripData?.find((trip: any) => trip.id === item.tripId)?.name || 'Unknown'
  }))

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

export default ReviewsPage
