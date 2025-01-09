import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentVehicle } from '@/queries/history'
import { useQueryVehicles } from '@/queries/vehicle'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Col, DatePicker, Form, Row, Select, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface DataType {
  key: string
  licensePlate: string
  driverName: string
  price: number
  vehicleOwner: string
  createdAt: string // ISO string for date-time
}
const checkLoginToken = () => {
  // Constants for storage keys to avoid typos and enable easy updates
  const STORAGE_KEYS = {
    TOKEN: 'token',
    PROFILE: 'profile'
  };

  // Helper function to clear auth data
  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  };

  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (!token) {
      return null;
    }

    // Validate token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode and parse token payload
    const payload = tokenParts[1];
    const tokenData = JSON.parse(atob(payload));

    // Add buffer time (e.g., 60 seconds) to handle slight time differences
    const EXPIRATION_BUFFER = 60 * 1000; // 60 seconds in milliseconds
    const currentTime = Date.now();
    const expirationTime = tokenData.exp * 1000;

    if (!tokenData.exp) {
      throw new Error('Token missing expiration');
    }

    if (expirationTime - EXPIRATION_BUFFER < currentTime) {
      throw new Error('Token expired');
    }

    return token;

  } catch (error) {
    // Log error for debugging but don't expose details to client
    
    clearAuthData();
    return null;
  }
};
const HistoryRentVehiclePage: React.FC = () => {
  const [form] = Form.useForm()

  const [queryParams, setQueryParams] = React.useState({
    startDate: '',
    endDate: '',
    vehicleId: ''
  })

  const { data, isLoading, refetch } = useQueryHistoryRentVehicle(queryParams)
  const { data: vehicleData } = useQueryVehicles()

  const [tableData, setTableData] = useState<DataType[]>([])

  useEffect(() => {
    const fetchLicensePlates = async () => {
      if (data?.paymentRentVehicelDTOs) {
        const updatedData = await Promise.all(
          data.paymentRentVehicelDTOs.map(async (item: any) => {
            try {
              const response = await axios.get(
                `https://boring-wiles.202-92-7-204.plesk.page/api/Vehicle/getInforVehicle/${item.vehicelId}`,
                {
                  headers: {
                    Authorization: "Bearer " + checkLoginToken(),
                  },
                }
              )
              return {
                ...item,
                licensePlate: response.data.licensePlate,
                key: item.vehicelId
              }
            } catch (error) {
              console.error('Error fetching license plate:', error)
              return { ...item, licensePlate: 'N/A', key: item.vehicelId }
            }
          })
        )
        setTableData(updatedData)
      }
    }
    fetchLicensePlates()
  }, [data])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licensePlate'),
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
  ]

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate === null ? '' : dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: values.startDate === null ? '' : dayjs(values.endDate).format('YYYY-MM-DD')
      }

      setQueryParams(formattedValues)
      await refetch()
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
                startDate: dayjs()
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
            <Table dataSource={tableData} columns={columns} />
            <p style={{ marginTop: 18 }}>Total: {formatPrize(data?.total)}</p>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentVehiclePage
