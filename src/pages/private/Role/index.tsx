import { useQueryRole } from '@/queries/account'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  id: number
  roleName: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: '45%'
  },
  {
    title: 'Role name',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center',
    width: '45%'
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

const RolePage: React.FC = () => {
  const { data, isLoading } = useQueryRole()

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

export default RolePage
