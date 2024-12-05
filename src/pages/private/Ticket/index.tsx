import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'
import { formatTime } from '../../../helpers'
import { useQueryTicket } from '../../../queries/ticket'

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

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Code',
    dataIndex: 'codePromotion',
    key: 'codePromotion',
    render: (text) => <span>{text ?? 'null'}</span>,
    width: '10%'
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <a>{text}</a>,
    width: '15%'
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    width: '15%'
  },
  {
    title: 'Điểm đi',
    dataIndex: 'pointStart',
    key: 'pointStart',
    width: '10%'
  },
  {
    title: 'Điểm đến',
    dataIndex: 'pointEnd',
    key: 'pointEnd',
    width: '10%'
  },
  {
    title: 'Thời gian bắt dầu',
    dataIndex: 'timeFrom',
    key: 'timeFrom',
    render: (text) => <span>{formatTime(text)}</span>,
    width: '10%'
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'timeTo',
    key: 'timeTo',
    render: (text) => <span>{formatTime(text)}</span>,
    width: '10%'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: '10%'
  },
  {
    title: 'Action',
    key: 'action',
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

const TicketPage: React.FC = () => {
  const { data } = useQueryTicket()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default TicketPage
