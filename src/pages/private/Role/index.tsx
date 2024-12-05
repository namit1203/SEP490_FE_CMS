import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'
import { useQueryRole } from '../../../queries/account'

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
    width: '45%'
  },
  {
    title: 'Role name',
    dataIndex: 'roleName',
    key: 'roleName',
    width: '45%'
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

const RolePage: React.FC = () => {
  const { data } = useQueryRole()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default RolePage
