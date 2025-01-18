import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatPrize, formatTime, generateFilters } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteLossCostMutation, useQueryLossCost } from '@/queries/fixed-cost'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataTypeFixedCost } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, Col, DatePicker, Form, message, Popconfirm, Row, Select, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

const FixedCostPage: React.FC = () => {
  const [form] = Form.useForm()

  const [queryParams, setQueryParams] = React.useState({
    startDate: '',
    endDate: '',
    vehicleId: ''
  })

  const { data, isLoading, refetch } = useQueryLossCost(queryParams)

  const { data: vehicleData } = useQueryVehicles()

  const deleteMutaion = useDeleteLossCostMutation()

  const dataSource = data?.listLossCostVehicle?.map((item: any) => ({
    ...item,
    key: item.id || `${item.description}-${item.licensePlate}-${item.dateIncurred}`
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

  const lossCostTypeFilters = data ? generateFilters(data?.listLossCostVehicle, 'lossCostType') : []

  const columns: TableProps<DataTypeFixedCost>['columns'] = [
    {
      title: 'Tên chi phí',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '20%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: '15%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licensePlate')
    },
    {
      title: 'Chủ xe',
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      width: '20%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner')
    },
    {
      title: 'Loại chi phí',
      dataIndex: 'lossCostType',
      key: 'lossCostType',
      align: 'center',
      width: '20%',
      filters: lossCostTypeFilters,
      onFilter: (value, record) => record.lossCostType === value,
      render: (value) => value || 'N/A'
    },
    {
      title: 'Chi phí',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => a.price - b.price,
      align: 'center',
      width: '10%'
    },
    {
      title: 'Ngày phát sinh',
      dataIndex: 'dateIncurred',
      key: 'dateIncurred',
      align: 'center',
      sorter: (a, b) => Date.parse(a.dateIncurred) - Date.parse(b.dateIncurred),
      render: (date) => <span>{formatTime(date)}</span>,
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
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleFormDelete(record.id)}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : null,
        endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : null
      }

      // Update the query parameters
      setQueryParams(formattedValues)

      // Refetch the query with updated parameters
      await refetch()

      console.log('Fetched Data:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Form onFinish={onFinish} layout='horizontal' form={form}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label='Start Date'
                    name='startDate'
                  
                  >
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='End Date'
                    name='endDate'
                   
                  >
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name='vehicleId' rules={[{ required: false, message: 'Vui lòng chọn xe!' }]}>
                    <Select placeholder='Chọn xe' style={{ width: '80%' }} allowClear>
                      {vehicleData?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.licensePlate}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button htmlType='submit' type='primary'>
                    Tìm
                  </Button>
                </Col>
              </Row>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to='add'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Thêm mới
                </Button>
              </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
            <div>
              Total : <span style={{ fontSize: 20 }}>{data?.totalCost ? formatPrize(data.totalCost) : '(Không)'}</span>
            </div>
          </>
        )
      })}
    </>
  )
}
export default FixedCostPage
