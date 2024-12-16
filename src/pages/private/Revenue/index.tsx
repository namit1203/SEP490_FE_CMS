import React from 'react'
import { Button, message, Table } from 'antd'
import { useExportRevenueMutation, useQueryRevenue } from '@/queries/revenue'
import useColumnSearch from '@/hooks/useColumnSearch'
import renderWithLoading from '@/utils/renderWithLoading'
import { generateColumn } from '@/utils/tableColumns'
import { formatDate, formatPrize } from '@/helpers'
import { HttpStatusCode } from 'axios'
import { DownloadOutlined } from '@ant-design/icons'

const RevenuePage: React.FC = () => {
  const { data, isLoading } = useQueryRevenue()
  const { getColumnSearchProps } = useColumnSearch()

  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []
  const totalLossCosts = data?.totalLossCosts[0]?.listLossCostVehicle || []
  const rentDriverData = data?.totalPayementRentDrivers[0]?.paymentRentDriverDTOs || []
  const rentVehicleData = data?.totalPaymentRentVehicleDTOs[0]?.paymentRentVehicelDTOs || []

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

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
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
