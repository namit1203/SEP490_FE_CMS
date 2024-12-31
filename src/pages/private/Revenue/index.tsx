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

  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []
  const totalLossCosts = data?.totalLossCosts[0]?.listLossCostVehicle || []
  const rentDriverData = data?.totalPayementRentDrivers[0]?.paymentRentDriverDTOs || []
  const rentVehicleData = data?.totalPaymentRentVehicleDTOs[0]?.paymentRentVehicelDTOs || []

  useEffect(() => {
    refetch()
  }, [refetch])

  const total = data?.totalRevenue

  const revenueTicketDataColumns = [
    generateColumn('pricePromotion', 'Price Promotion', {
      formatter: formatPrize,
      width: '10%'
    }),
    generateColumn('vehicleOwner', 'Vehicle Owner', { width: '25%' }),
    generateColumn('liscenseVehicle', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps,
      width: '25%'
    }),
    generateColumn('typeOfTicket', 'Type Of Ticket', { width: '25%' }),
    generateColumn('typeOfPayment', 'Type Of Payment', { width: '25%' })
  ]

  const rentDriverDataColumns = [
    generateColumn('driverName', 'Driver Name', {
      searchable: true,
      getColumnSearchProps
    }),
    generateColumn('vehicleId', 'Vehicle Id'),
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
    generateColumn('description', 'Description')
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
    data.map((item: any, index: number) => ({
      ...item,
      key: item[uniqueKey] || index
    }))

  const revenueTicketSource = generateDataSource(revenueTicketData, 'id')
  const rentDriverSource = generateDataSource(rentDriverData, 'id')
  const rentVehicleSource = generateDataSource(rentVehicleData, 'id')
  const lossCostSource = generateDataSource(totalLossCosts, 'id')

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
                <Col span={4}>
                  <Form.Item label='Start Date' name='startDate'>
                    <DatePicker format='DD-MM-YYYY' onChange={(date) => console.log(date?.toISOString())} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label='End Date' name='endDate'>
                    <DatePicker format='DD-MM-YYYY' onChange={(date) => console.log(date?.toISOString())} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name='vehicleId'>
                    <Select placeholder='Chọn xe' style={{ width: '80%' }} allowClear>
                      {vehicleData?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.id} - {item.licensePlate}
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 16 }}>
              <Button onClick={downloadFile} type='primary' icon={<DownloadOutlined />} ghost>
                Export revenue
              </Button>
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Ticket</h4>
              <Table columns={revenueTicketDataColumns} dataSource={revenueTicketSource} />
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Rent Driver</h4>
              <Table columns={rentDriverDataColumns} dataSource={rentDriverSource} />
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Rent Vehicle</h4>
              <Table columns={rentVehicleDataColumns} dataSource={rentVehicleSource} />
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Lost Cost</h4>
              <Table columns={lossCostDataColumns} dataSource={lossCostSource} />
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
