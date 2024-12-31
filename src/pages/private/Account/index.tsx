import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteAccountMutation, useQueryAccount } from '@/queries/account'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: number
  avatar: string
  email: string
  fullName: string
  numberPhone: string
  username: string
  status: boolean
}

const AccountPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryAccount()

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const deleteMutation = useDeleteAccountMutation()

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
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (src) => (
        <Avatar src={src || 'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
      ),
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('email'),
      render: (text) => <a>{text}</a>,
      width: '20%'
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
      width: '20%',
      ...useColumnSearch().getColumnSearchProps('fullName')
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone',
      align: 'center',
      width: '20%',
      ...useColumnSearch().getColumnSearchProps('numberPhone')
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      width: '20%',
      ...useColumnSearch().getColumnSearchProps('username')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <p>{status === true ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
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
              {record.status ? 'Lock' : 'Unlock'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

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

export default AccountPage
