import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'
import { formatDate } from '../../../helpers'
import { useQueryReviews } from '../../../queries/reviews'
import { useQueryTrips } from '../../../queries/trip'

interface DataType {
  key: string
  id: number
  tripId: number
  createdAt: number
  updateAt: number
  description: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%'
  },
  {
    title: 'Tên chuyến đi',
    dataIndex: 'tripId',
    key: 'tripId',
    render: (_, record) => <span>{record.tripId}</span>,
    width: '25%'
  },
  {
    title: 'Đánh giá',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <span>{text ?? 'null'}</span>,
    width: '25%'
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => <span>{formatDate(date)}</span>,
    width: '25%'
  },
  {
    title: 'Thời gian cập nhật',
    dataIndex: 'updateAt',
    key: 'updateAt',
    render: (date) => <span>{formatDate(date)}</span>,
    width: '25%'
  },
  {
    title: 'Action',
    key: 'action',
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

const ReviewsPage: React.FC = () => {
  const { data } = useQueryReviews()
  const { data: tripData } = useQueryTrips()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField,
    tripId: tripData?.find((trip: any) => trip.id === item.tripId)?.name || 'Unknown'
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default ReviewsPage
