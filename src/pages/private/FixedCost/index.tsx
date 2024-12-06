import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryLossCost } from '@/queries/fixed-cost'
import renderWithLoading from '@/utils/renderWithLoading'
import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'

interface DataType {
  key: string
  description: string
  licensePlate: string
  price: number
  dateIncurred: string
}

const FixedCostPage: React.FC = () => {
  const { data, isLoading } = useQueryLossCost()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chi phí',
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
      width: '25%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licensePlate')
    },
    {
      title: 'Chi phí',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => a.price - b.price,
      align: 'center',
      width: '20%'
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
  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || `${item.description}-${item.licensePlate}-${item.dateIncurred}`
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
export default FixedCostPage
