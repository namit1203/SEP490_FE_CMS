import { formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTicket } from '@/queries/ticket'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

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
  const { data, isLoading } = useQueryTicket()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Code',
      dataIndex: 'codePromotion',
      key: 'codePromotion',
      ...useColumnSearch().getColumnSearchProps('codePromotion'),
      render: (text) => <span>{text ?? 'null'}</span>,
      align: 'center',
      width: '10%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '15%'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '15%'
    },
    {
      title: 'Điểm đi',
      dataIndex: 'pointStart',
      key: 'pointStart',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Điểm đến',
      dataIndex: 'pointEnd',
      key: 'pointEnd',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Thời gian bắt dầu',
      dataIndex: 'timeFrom',
      key: 'timeFrom',
      align: 'center',
      render: (text) => <span>{formatTime(text)}</span>,
      width: '10%'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'timeTo',
      key: 'timeTo',
      align: 'center',
      render: (text) => <span>{formatTime(text)}</span>,
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
      title: 'Action',
      key: 'action',
      align: 'center',
      render: () => (
        <Space size='middle'>
          <Button type='primary'>Edit</Button>
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
