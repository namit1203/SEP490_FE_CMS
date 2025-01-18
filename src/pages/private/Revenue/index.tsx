import React, { useEffect } from 'react'
import { Button, Col, DatePicker, Form, message, Row, Select, Table } from 'antd'
import { useExportRevenueMutation, useQueryRevenue } from '@/queries/revenue'
import useColumnSearch from '@/hooks/useColumnSearch'
import renderWithLoading from '@/utils/renderWithLoading'
import { generateColumn } from '@/utils/tableColumns'
import { formatDate, formatPrize } from '@/helpers'
import { HttpStatusCode } from 'axios'
import { DownloadOutlined } from '@ant-design/icons'
import { useQueryVehicles } from '@/queries/vehicle'
import dayjs from 'dayjs'
// import { useTableWithTotal } from '@/hooks/useTableWithTotal'

const RevenuePage: React.FC = () => {
  const [form] = Form.useForm()

  const [queryParams, setQueryParams] = React.useState({
    startDate: '',
    endDate: '',
    vehicleId: ''
  })

  const { data, isLoading, refetch } = useQueryRevenue(queryParams)
  const { data: vehicleData } = useQueryVehicles()
  const { getColumnSearchProps } = useColumnSearch()

  const revenueTicketData = data?.revenueTicketDTOs[0] || []
  const totalLossCosts = data?.totalLossCosts[0] || []
  const rentDriverData = data?.totalPayementRentDrivers[0] || []
  const rentVehicleData = data?.totalPaymentRentVehicleDTOs[0] || []

  console.log(rentDriverData)

  useEffect(() => {
    refetch()
  }, [refetch])

  const total = data?.totalRevenue

  const revenueTicketDataColumns = [
    generateColumn('liscenseVehicle', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps,
      width: '20%'
    }),
    generateColumn('typeOfTicket', 'Type Of Ticket', { width: '20%' }),
   
    generateColumn('vehicleOwner', 'Vehicle Owner', { width: '20%' }),
    generateColumn('pricePromotion', 'Price Promotion', {
      formatter: formatPrize,
      width: '20%'
    }),
    generateColumn('createdAt', 'Date', { formatter: formatDate })
  ]

  const rentDriverDataColumns = [
    generateColumn('licenseVehicle', 'Liscense Vehicle'),
    generateColumn('driverName', 'Driver Name', {
      searchable: true,
      getColumnSearchProps
    }),
    
    generateColumn('vehicleOwner', 'Vehicle Owner'),
    generateColumn('price', 'Price', { formatter: formatPrize }),
    generateColumn('createdAt', 'Date', { formatter: formatDate })
  ]

  const lossCostDataColumns = [
    generateColumn('licensePlate', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps
    }),
    generateColumn('vehicleOwner', 'Vehicle Owner'),
    generateColumn('lossCostType', 'Lost Cost Type'),
    generateColumn('price', 'Price', { formatter: formatPrize }),
    generateColumn('dateIncurred', 'Date', { formatter: formatDate }),

  ]

  const rentVehicleDataColumns = [
    generateColumn('licenseVehicle', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps
    }),
    generateColumn('driverName', 'Driver Name'),
    generateColumn('carOwner', 'Vehicle Owner'),
    generateColumn('price', 'Price', { formatter: formatPrize }),
    generateColumn('createdAt', 'Date', { formatter: formatDate })
  ]

  const generateDataSource = (data: any[], uniqueKey: string) =>
    data?.map((item: any, index: number) => ({
      ...item,
      key: item[uniqueKey] || index
    }))

  const revenueTicketSource = generateDataSource(revenueTicketData?.listTicket, 'id')
  const rentDriverSource = generateDataSource(rentDriverData?.paymentRentDriverDTOs, 'id')
  const rentVehicleSource = generateDataSource(rentVehicleData?.paymentRentVehicelDTOs, 'id')
  const lossCostSource = generateDataSource(totalLossCosts?.listLossCostVehicle, 'id')

  const updateMutation = useExportRevenueMutation()

  const downloadFile = async () => {
    try {
      const response = await updateMutation.mutateAsync({ body: data })

      if (response.status === HttpStatusCode.Ok) {
        // Extract headers and handle the Blob
        const contentDisposition = response.headers['content-disposition']
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') || 'Export_Revenue.xlsx'
          : 'Export_Revenue.xlsx'

        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        link.remove()

        message.success('Export successfully')
      } else {
        message.error('Export failed')
      }
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate === null ? '' : dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: values.endDate === null ? '' : dayjs(values.endDate).format('YYYY-MM-DD')
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
                    rules={[{ required: false, message: 'Vui lòng chọn ngày!' }]}
                    label='Start Date'
                    name='startDate'
                  >
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    rules={[{ required: false, message: 'Vui lòng chọn ngày!' }]}
                    label='End Date'
                    name='endDate'
                  >
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 16 }}>
              <Button onClick={downloadFile} type='primary' icon={<DownloadOutlined />} ghost>
                Export revenue
              </Button>
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Ticket</h4>
              <Table columns={revenueTicketDataColumns} dataSource={revenueTicketSource} />
              <div style={{ fontSize: 15, marginBottom: 30 }}>
                Total : <span>{formatPrize(revenueTicketData?.total)}</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Rent Driver</h4>
              <Table columns={rentDriverDataColumns} dataSource={rentDriverSource} />
              <div style={{ fontSize: 15, marginBottom: 30 }}>
                Total : <span>{formatPrize(rentDriverData?.total)}</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Rent Vehicle</h4>
              <Table columns={rentVehicleDataColumns} dataSource={rentVehicleSource} />
              <div style={{ fontSize: 15, marginBottom: 30 }}>
                Total : <span>{formatPrize(rentVehicleData?.total)}</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Lost Cost</h4>
              <Table columns={lossCostDataColumns} dataSource={lossCostSource} />
              <div style={{ fontSize: 15, marginBottom: 30 }}>
                Total : <span>{formatPrize(totalLossCosts?.totalCost)}</span>
              </div>
            </div>
            <div>
              Total : <span style={{ fontSize: 20 }}>{formatPrize(total)}</span>
            </div>
          </>
        )
      })}
    </>
  )
}

export default RevenuePage
