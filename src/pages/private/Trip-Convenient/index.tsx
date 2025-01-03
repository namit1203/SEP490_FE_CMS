import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTripConvenience, useUpdateStatusTripConvenientMutation } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import { HttpStatusCode } from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const TripConvenientPage = () => {
  const { data, refetch, isLoading } = useQueryTripConvenience()
  const updateStatusMutation = useUpdateStatusTripConvenientMutation()

  // Transform data source to ensure each record has a `key`
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetch()
  }, [refetch])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('name'),
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Nơi khởi hành',
      dataIndex: 'pointStart',
      key: 'pointStart',
      align: 'center'
    },
    {
      title: 'Nơi kết thúc',
      dataIndex: 'pointEnd',
      key: 'pointEnd',
      align: 'center'
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center'
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>
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
            title='Are you sure to change status?'
            onConfirm={() => handleChangeStatus(record.key)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Change status
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleChangeStatus = async (id: string) => {
    try {
      const response = await updateStatusMutation.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update status successfully')
        refetch()
      } else {
        message.error('Update status failed')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 16 }}>
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

export default TripConvenientPage
