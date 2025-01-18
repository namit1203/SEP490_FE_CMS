import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentDriver } from '@/queries/history'
import { useQueryVehicles } from '@/queries/vehicle'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
// import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Row, Select, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface DataType {
  key: string
  price: number
  driverName: string
  endStart: number
  timeStart: number
  vehicleOwner: string
  createdAt: string
}

const HistoryRentDriverPage: React.FC = () => {
  const [form] = Form.useForm()

  const [queryParams, setQueryParams] = React.useState({
    startDate: '',
    endDate: '',
    vehicleId: ''
  })

  const { data, isLoading, refetch } = useQueryHistoryRentDriver(queryParams)
  const { data: vehicleData } = useQueryVehicles()

  const columns: TableProps<DataType>['columns'] = [
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
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('createdAt'),
      render: (text) => {
        if (!text) return <span>null</span>;
        const formattedDate = dayjs(text).format('HH:mm - DD/MM');
        return <span>{formattedDate}</span>;
      },
      width: '20%'
    }
    // {
    //   title: 'Thời gian bắt đầu',
    //   dataIndex: 'timeStart',
    //   key: 'timeStart',
    //   align: 'center',
    //   filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
    //     <div style={{ padding: 8 }}>
    //       <DatePicker
    //         onChange={(date, dateString: any) => {
    //           if (date) {
    //             setSelectedKeys([dateString])
    //           } else {
    //             setSelectedKeys([])
    //           }
    //         }}
    //         format='YYYY-MM-DD'
    //         style={{ marginBottom: 8, display: 'block' }}
    //       />
    //       <div>
    //         <Button
    //           type='primary'
    //           onClick={confirm as any}
    //           icon={<SearchOutlined />}
    //           size='small'
    //           style={{ width: 90, marginRight: 8 }}
    //         >
    //           Search
    //         </Button>
    //         <Button onClick={clearFilters as any} size='small' style={{ width: 90 }}>
    //           Reset
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    //   onFilter: (value, record) => {
    //     if (value) {
    //       const recordDate = dayjs(record.timeStart)
    //       return recordDate.isSame(dayjs(value as string), 'day')
    //     }
    //     return false
    //   },
    //   render: (text) => <span>{formatTime(text)}</span>
    // },
    // {
    //   title: 'Thời gian kết thúc',
    //   dataIndex: 'endStart',
    //   key: 'endStart',
    //   align: 'center',
    //   filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
    //     <div style={{ padding: 8 }}>
    //       <DatePicker
    //         onChange={(date, dateString: any) => {
    //           if (date) {
    //             setSelectedKeys([dateString])
    //           } else {
    //             setSelectedKeys([])
    //           }
    //         }}
    //         format='YYYY-MM-DD'
    //         style={{ marginBottom: 8, display: 'block' }}
    //       />
    //       <div>
    //         <Button
    //           type='primary'
    //           onClick={confirm as any}
    //           icon={<SearchOutlined />}
    //           size='small'
    //           style={{ width: 90, marginRight: 8 }}
    //         >
    //           Search
    //         </Button>
    //         <Button onClick={clearFilters as any} size='small' style={{ width: 90 }}>
    //           Reset
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    //   onFilter: (value, record) => {
    //     if (value) {
    //       const recordDate = dayjs(record.endStart)
    //       return recordDate.isSame(dayjs(value as string), 'day')
    //     }
    //     return false
    //   },
    //   render: (text) => <span>{formatTime(text)}</span>
    // }
  ]

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate === null ? '' : dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: values.startDate === null ? '' : dayjs(values.endDate).format('YYYY-MM-DD')
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
                    rules={[{ required: false, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                  >
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='End Date'
                    name='endDate'
                    rules={[{ required: false, message: 'Vui lòng chọn ngày kết thúc!' }]}
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
                <Col span={1}>
                  <Button htmlType='submit' type='primary'>
                    Tìm
                  </Button>
                </Col>
              </Row>
            </Form>
            <Table
              columns={columns}
              dataSource={data?.paymentRentDriverDTOs.map((item: any) => ({ ...item, key: item.id }))}
            />
            <div>
              Total : <span style={{ fontSize: 20 }}>{formatPrize(data?.total)}</span>
            </div>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentDriverPage
