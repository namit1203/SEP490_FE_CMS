import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatDate } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryReviews, useRemoveReviewsMutation } from '@/queries/reviews'
import { useQueryTrips } from '@/queries/trip'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'

interface DataType {
  key: string
  id: number
  tripId: number
  createdAt: number
  updateAt: number
  description: string
}

const ReviewsPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryReviews()
  const { data: tripData } = useQueryTrips()
  const deleteMutaion = useRemoveReviewsMutation()
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const handleDeleteRequest = async (id: number) => {
    try {
      setIsLoadingDelete(true)
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetch()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error when block driver:', error)
      message.error('Block driver failed')
    } finally {
      setIsLoadingDelete(false)
    }
  }

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
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDeleteRequest(record.id as number)}
          >
            <Button type='primary' danger loading={isLoadingDelete} disabled={isLoadingDelete}>
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
