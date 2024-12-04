import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { ActionType, ActionTypeDescriptions } from '../../../enums/enum'
import { useQueryRequest } from '../../../queries/request'

interface DataType {
  key: string
  id: string | number
  description: string
  note: string
  userId: string | number
  typeId?: string | number
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%'
  },
  {
    title: 'UserID',
    dataIndex: 'userId',
    key: 'userId',
    width: '10%'
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <a>{text}</a>,
    width: '25%'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'note',
    key: 'note',
    width: '20%'
  },
  {
    title: 'Type',
    dataIndex: 'typeId',
    key: 'typeId',
    width: '20%',
    render: (type: ActionType) => <span>{ActionTypeDescriptions[type]}</span>,
    filters: Object.entries(ActionTypeDescriptions).map(([key, value]) => ({
      text: value,
      value: Number(key)
    })),
    onFilter: (value, record) => record.typeId === value
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <Button type='primary'>Show</Button>
        <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
          <Button type='primary' danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]

const RequestPage: React.FC = () => {
  const { data } = useQueryRequest()

  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}
export default RequestPage
