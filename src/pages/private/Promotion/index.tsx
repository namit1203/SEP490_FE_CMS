import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeletePromotionMutation, useQueryPromotion } from '@/queries/promotions'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import { HttpStatusCode } from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  description: string
  codePromotion: string
  discount: number
  exchangePoint: number
}

const PromotionPage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryPromotion()

  const deleteMutation = useDeletePromotionMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutation.mutateAsync({ id })
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%',
      render: (link) => <Link to={`/promotion/detail?id=${link}`}>{link}</Link>
    },
    {
      title: 'Code',
      dataIndex: 'codePromotion',
      key: 'codePromotion',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('codePromotion'),
      sorter: (a, b) => a.codePromotion.localeCompare(b.codePromotion),
      width: '25%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      width: '25%'
    },
    {
      title: 'Giá trị',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
      sorter: (a, b) => a.discount - b.discount,
      width: '20%'
    },
    {
      title: 'Số điểm đổi',
      dataIndex: 'exchangePoint',
      key: 'exchangePoint',
      align: 'center',
      sorter: (a, b) => a.exchangePoint - b.exchangePoint,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (record) => (
        <Space size='middle'>
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
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

export default PromotionPage
