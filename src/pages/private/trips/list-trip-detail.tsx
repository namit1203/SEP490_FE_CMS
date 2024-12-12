import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryListTripDetail } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Space, Table, TableProps } from 'antd'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const ListTripDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const tripDetailID: string | number | null = searchParams.get('id')

  const { data, isLoading } = useQueryListTripDetail({ id: tripDetailID })

  console.log(data)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Điểm đón',
      dataIndex: 'pointStartDetails',
      key: 'pointStartDetails',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('pointStartDetails')
    },
    {
      title: 'Điểm đến',
      dataIndex: 'pointEndDetails',
      key: 'pointEndDetails',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('pointEndDetails')
    },
    {
      title: 'Thời điểm đón',
      dataIndex: 'timeStartDetils',
      key: 'timeStartDetils',
      align: 'center'
    },
    {
      title: 'Thời điểm đến',
      dataIndex: 'timeEndDetails',
      key: 'timeEndDetails',
      align: 'center'
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

export default ListTripDetailPage
