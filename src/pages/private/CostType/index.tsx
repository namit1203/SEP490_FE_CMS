import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatDate } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteCostTypeMutation, useQueryCostType } from '@/queries/cost-type'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  id: number
  key: string
  description: string
  createdAt: number
  updateAt: number
  status: boolean
}

const CostTypePage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryCostType()

  const deleteMutaion = useDeleteCostTypeMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
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
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to='add'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Thêm mới
                </Button>
              </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}
export default CostTypePage
