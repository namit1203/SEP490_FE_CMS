import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { useQueryCostType } from '@/queries/cost-type'
import { formatDate } from '@/helpers'
import renderWithLoading from '@/utils/renderWithLoading'
import useColumnSearch from '@/hooks/useColumnSearch'

interface DataType {
  key: string
  description: string
  createdAt: number
  updateAt: number
  status: boolean
}

const CostTypePage: React.FC = () => {
  const { data, isLoading } = useQueryCostType()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Loại chi phí',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '30%'
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date) => <span>{formatDate(date)}</span>,
      width: '30%'
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
export default CostTypePage
