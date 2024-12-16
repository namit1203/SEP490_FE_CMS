import { formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTicket, useRemoveTicketMutation } from '@/queries/ticket'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import { HttpStatusCode } from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  codePromotion: string
  description: string
  note: string
  pointEnd: string
  pointStart: string
  timeFrom: string
  timeTo: string
  status: string
}

const TicketPage: React.FC = () => {
  const { data, refetch, isLoading } = useQueryTicket()

  const deleteMutation = useRemoveTicketMutation()

  const emptyValue = (value: any) => {
    return <span>{value === null || value === undefined ? '(Không)' : value}</span>
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutation.mutateAsync({ id })
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

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '15%',
      render: (text) => emptyValue(text)
    },
    {
      title: 'Điểm đi',
      dataIndex: 'pointStart',
      key: 'pointStart',
      align: 'center',
      width: '10%',
      render: (text) => emptyValue(text)
    },
    {
      title: 'Điểm đến',
      dataIndex: 'pointEnd',
      key: 'pointEnd',
      align: 'center',
      width: '10%',
      render: (text) => emptyValue(text)
    },
    {
      title: 'Thời gian bắt dầu',
      dataIndex: 'timeFrom',
      key: 'timeFrom',
      align: 'center',
      render: (text) => emptyValue(formatTime(text)),
      width: '10%'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'timeTo',
      key: 'timeTo',
      align: 'center',
      render: (text) => emptyValue(formatTime(text)),
      width: '10%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Code',
      dataIndex: 'codePromotion',
      key: 'codePromotion',
      ...useColumnSearch().getColumnSearchProps('codePromotion'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '10%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (ticket) => (
        <Space size='middle'>
          <Link to={`/ticket/detail?id=${ticket.id}`}>
            <Button color='default' variant='solid'>
              Detail
            </Button>
          </Link>
          <Link to={`/ticket/edit?id=${ticket.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>

          <Popconfirm
            onConfirm={() => handleFormDelete(ticket.id)}
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
          >
            <Button disabled={ticket.typeOfPayment !== 2} type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
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

export default TicketPage
