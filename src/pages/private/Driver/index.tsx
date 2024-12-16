import useColumnSearch from '@/hooks/useColumnSearch'
import { useBlockDriverMutation, useQueryDriver } from '@/queries/driver'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: number
  name: string
  numberPhone: string
  avatar?: string
  discount: number
  status: boolean
}

const DriverPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryDriver()
  const [isLoadingBlock, setIsLoadingBlock] = useState<boolean>(false)

  const blockMutation = useBlockDriverMutation()

  const handleBlockDriver = async (id: number) => {
    try {
      setIsLoadingBlock(true)
      await blockMutation.mutateAsync(
        { id },
        {
          onSuccess: () => {
            message.success('Block driver successfully')
            refetch()
          }
        }
      )
    } catch (error) {
      console.error('Error when block driver:', error)
      message.error('Block driver failed')
    } finally {
      setIsLoadingBlock(false)
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên tài xế',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('name'),
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '25%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone',
      width: '25%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('numberPhone')
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: () => (
        <Avatar src={'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
      ),
      width: '15%'
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
            title='Bạn có chắc chắn muốn kích hoạt tài khoản này không?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleBlockDriver(record.id)}
          >
            <Button type='primary' danger loading={isLoadingBlock} disabled={isLoadingBlock}>
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

export default DriverPage
