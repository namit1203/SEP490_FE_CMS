import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { formatTime } from '../../../helpers'
import { useQueryLossCost } from '../../../queries/fixed-cost'

interface DataType {
  key: string
  description: string
  licensePlate: string
  price: number
  dateIncurred: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên chi phí',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <a>{text}</a>,
    width: '25%'
  },
  {
    title: 'Biển số xe',
    dataIndex: 'licensePlate',
    key: 'licensePlate',
    width: '25%'
  },
  {
    title: 'Chi phí',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
    width: '20%'
  },
  {
    title: 'Ngày phát sinh',
    dataIndex: 'dateIncurred',
    key: 'dateIncurred',
    sorter: (a, b) => Date.parse(a.dateIncurred) - Date.parse(b.dateIncurred),
    render: (date) => <span>{formatTime(date)}</span>,
    width: '20%'
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

const FixedCostPage: React.FC = () => {
  const { data } = useQueryLossCost()

  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}
export default FixedCostPage
