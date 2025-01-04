import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentVehicle } from '@/queries/history'
import { useQueryVehicles } from '@/queries/vehicle'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Col, DatePicker, Form, Row, Select, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface DataType {
  key: string
  vehiclevehiclePrice: number
  driverName: string
  timeEnd: number
  vehicelId: number
  price: number
  vehicleOwner: string
  timeStart: string // ISO string for date-time
  endStart: string // ISO string for date-time
  createdAt: string // ISO string for date-time
}

const HistoryRentVehiclePage: React.FC = () => {
  const [form] = Form.useForm()

  const [queryParams, setQueryParams] = React.useState({
    startDate: '',
    endDate: '',
    vehicleId: ''
  })

  const { data, isLoading, refetch } = useQueryHistoryRentVehicle(queryParams)
  const { data: vehicleData } = useQueryVehicles()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Vehicle Id',
      dataIndex: 'vehicelId',
      key: 'vehicelId',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicelId'),
      sorter: (a, b) => handlingTsUndefined(a.vehicelId) - handlingTsUndefined(b.vehicelId),
      width: '20%'
    },
    {
      title: 'Tên tài xế',
      dataIndex: 'driverName',
      key: 'driverName',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('driverName'),
      width: '20%'
    },
    {
      title: 'Giá xe',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price),
      width: '20%'
    },
    {
      title: 'Chủ xe',
      dataIndex: 'carOwner',
      key: 'carOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('carOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text) => <span>{formatTime(text)}</span>,
      width: '20%'
    }
    // {
    //   title: 'Thời gian kết thúc',
    //   dataIndex: 'endStart',
    //   key: 'endStart',
    //   align: 'center',
    //   sorter: (a, b) => new Date(a.endStart).getTime() - new Date(b.endStart).getTime(),
    //   render: (text) => <span>{formatTime(text)}</span>
    // }
  ]

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate === null ? '' : dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: values.startDate === null ? '' : dayjs(values.endDate).format('YYYY-MM-DD')
        // endDate: dayjs(values.endDate).format('YYYY-MM-DD')
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
            <Form
              initialValues={{
                startDate: dayjs() // Set the default value for the DatePicker
              }}
              onFinish={onFinish}
              layout='horizontal'
              form={form}
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label='From Date' name='startDate'>
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label='To Date' name='endDate'>
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name='vehicleId'>
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
            <Table
              dataSource={data?.paymentRentVehicelDTOs.map((item: any) => ({ ...item, key: item.vehicelId }))}
              columns={columns}
            />
            <p style={{ marginTop: 18 }}>Total: {formatPrize(data?.total)}</p>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentVehiclePage
