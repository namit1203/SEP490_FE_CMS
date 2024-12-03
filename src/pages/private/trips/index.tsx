import React from 'react'
import { Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { useQueryTrips } from '../../../queries/trip'

interface DataType {
  key: string
  name: string
  description: string
  price: number
  tags: string[]
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const TripPage: React.FC = () => {
  const { data } = useQueryTrips()

  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}
export default TripPage
