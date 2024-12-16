import { ActionType, ActionTypeDescriptions, RoleType } from '@/enums/enum'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useAcceptCancleRequestMutation, useDeleteRequestMutation, useQueryRequest } from '@/queries/request'
import { useQueryUserProfile } from '@/queries/user-profile'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { HttpStatusCode } from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: string | number
  description: string
  note: string
  userName: number
  typeId: string | number
  status: boolean
}

const RequestPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryRequest()

  const { data: account } = useQueryUserProfile()

  const acceptMutaion = useAcceptCancleRequestMutation()

  const deleteMutaion = useDeleteRequestMutation()

  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false)

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleAccept = async (id: number) => {
    try {
      setIsAcceptLoading(true)
      const response = await acceptMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Accept successfully')
        refetch()
      } else {
        message.error('Accept failed')
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Accept failed')
    } finally {
      setIsAcceptLoading(false)
    }
  }
  const handleDeleteRequest = async (id: number) => {
    try {
      setIsLoadingDelete(true)
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetch()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error when block driver:', error)
      message.error('Block driver failed')
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tên',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: '20%',
      ...useColumnSearch().getColumnSearchProps('userName')
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '20%',
      render: (status: boolean) => <span>{status ? 'Đã xác nhận' : 'Chưa xác nhận'}</span>
    },
    {
      title: 'Type',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      width: '20%',
      render: (type: ActionType) => <span>{ActionTypeDescriptions[type]}</span>,
      filters: Object.entries(ActionTypeDescriptions).map(([key, value]) => ({
        text: value,
        value: Number(key)
      })),
      onFilter: (value, record) => record.typeId === value
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          {record.typeId !== 3 && (
            <Link to={`details?id=${record.id}`}>
              <Button type='primary'>Show</Button>
            </Link>
          )}
          <Popconfirm
            title='Bạn có chắc chắn muốn xóa yêu cầu này không?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDeleteRequest(record.id as number)}
          >
            <Button type='primary' danger loading={isLoadingDelete}>
              Delete
            </Button>
          </Popconfirm>
          {record.typeId === 3 && !record.status && (
            <Popconfirm
              title='Bạn có chắc chắn muốn hủy yêu cầu này không?'
              okText='Xác nhận'
              cancelText='Hủy'
              onConfirm={() => handleAccept(record.id as number)}
            >
              <Button type='default' loading={isAcceptLoading} disabled={isAcceptLoading}>
                Cancel
              </Button>
            </Popconfirm>
          )}
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
            {account && [RoleType.DRIVER, RoleType.VEHICLE_OWNER].includes(account?.role as RoleType) && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <Link to='add'>
                  <Button type='primary' icon={<PlusOutlined />} ghost>
                    {account?.role === RoleType.DRIVER ? 'Thuê xe' : 'Thuê tài xế'}
                  </Button>
                </Link>
              </div>
            )}
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}
export default RequestPage
