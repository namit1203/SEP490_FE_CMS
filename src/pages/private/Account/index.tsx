import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryAccount } from '@/queries/account'
import renderWithLoading from '@/utils/renderWithLoading'
import { Avatar, Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  avatar: string
  email: string
  fullName: string
  numberPhone: string
  username: string
  status: boolean
}

const AccountPage: React.FC = () => {
  const { data, isLoading } = useQueryAccount()
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: () => (
        <Avatar src={'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
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

export default AccountPage
