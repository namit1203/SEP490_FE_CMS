import { useDeleteRoleAccountMutation, useQueryRole } from '@/queries/account'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: number
  roleName: string
  status: boolean
}

const RolePage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryRole()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const deleteMutation = useDeleteRoleAccountMutation()

  const handleDeleteAccount = async (id: number) => {
    try {
      setIsLoadingDelete(true)
      await deleteMutation.mutateAsync(
        { id },
        {
          onSuccess: () => {
            message.success('Delete successfully')
            refetch()
          }
        }
      )
    } catch (error) {
      console.error('Error when delete account:', error)
      message.error('Delete failed')
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '30%'
    },
    {
      title: 'Role name',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      width: '30%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <p>{status === true ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '30%'
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
            title='Are you sure to lock this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDeleteAccount(record.id)}
          >
            <Button type='primary' danger loading={isLoadingDelete}>
              {record?.status ? 'Lock' : 'Unlock'}
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

export default RolePage
