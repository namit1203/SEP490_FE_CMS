import { RoleType } from '@/enums/enum'
import { formatPrize } from '@/helpers'
import { useQueryRevenue } from '@/queries/revenue'
import { useQueryUserProfile } from '@/queries/user-profile'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Result } from 'antd'
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBoardChartPage: React.FC = () => {
  const { data: account, isLoading: accountLoading } = useQueryUserProfile()
  const { data, isLoading } = useQueryRevenue({
    enabled: [RoleType.STAFF, RoleType.VEHICLE_OWNER].includes(account?.role)
  })
  const [showAllData, setShowAllData] = useState(false)
  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []
  const totalLossCosts = data?.totalLossCosts[0]?.listLossCostVehicle || []
  const rentDriverData = data?.totalPayementRentDrivers[0]?.paymentRentDriverDTOs || []
  const rentVehicleData = data?.totalPaymentRentVehicleDTOs[0]?.paymentRentVehicelDTOs || []

  const revenueTicketChartData: { name: string; price: number }[] = revenueTicketData
    .filter((item: any) => item.pricePromotion !== null && item.pricePromotion !== 0)
    .map((item: any) => ({
      name: item.vehicleOwner || 'Unknown',
      price: item.pricePromotion || 0
    }))

  const totalLossCostsData = totalLossCosts.map((item: any) => ({
    name: item.vehicleOwner || 'Unknown',
    price: item.price || 0
  }))

  const rentDriverChartData = rentDriverData.map((item: any) => ({
    name: item.driverName || 'Unknown',
    price: item.price || 0
  }))

  const rentVehicleChartData = rentVehicleData.map((item: any) => ({
    name: item.driverName || 'Unknown',
    price: item.price || 0
  }))

  const getTotalPrice = (data: { price: number }[]) => {
    return data.reduce((total, item) => total + item.price, 0)
  }

  const chartStyle = {
    marginBottom: 40
  }

  const renderChart = (data: any[], barColor: string, title: string) => (
    <div style={chartStyle}>
      <h4 style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>{title}</h4>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            tick={{ fontSize: 12 }}
            label={{ position: 'insideBottom', offset: -10, fontSize: 14 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              angle: -90,
              position: 'insideLeft',
              offset: 0,
              fontSize: 14
            }}
          />
          <Tooltip
            formatter={(value: number) => formatPrize(value)}
            contentStyle={{
              backgroundColor: '#f4f4f4',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 12
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 10,
              fontSize: 12
            }}
          />
          <Bar dataKey='price' fill={barColor} barSize={40} radius={[10, 10, 0, 0]} name='Price' />
        </BarChart>
      </ResponsiveContainer>
      {/* Hiển thị tổng giá trị */}
      <div style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>
        <strong>Total: </strong>
        {formatPrize(getTotalPrice(data))}
      </div>
    </div>
  )

  if (accountLoading) {
    return null
  }

  if (![RoleType.STAFF, RoleType.VEHICLE_OWNER].includes(account?.role)) {
    return <Result status='warning' title='Phải là Staff hoặc Vehicle Owner mới đươc truy cập' />
  }

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <div style={{ padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 28,
                marginBottom: 50,
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Dashboard
            </h2>
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <Button type='primary' onClick={() => setShowAllData(!showAllData)} style={{ fontSize: 16 }} ghost>
                {showAllData ? 'Hide All Data' : 'Show All Data'}
              </Button>
            </div>
            {renderChart(
              showAllData ? revenueTicketChartData : revenueTicketChartData.slice(0, 20),
              '#4A90E2',
              'Revenue Ticket'
            )}
            {renderChart(
              showAllData ? rentDriverChartData : rentDriverChartData.slice(0, 20),
              '#50C878',
              'Rent Driver'
            )}
            {renderChart(
              showAllData ? rentVehicleChartData : rentVehicleChartData.slice(0, 20),
              '#FF7F50',
              'Rent Vehicle'
            )}
            {renderChart(
              showAllData ? totalLossCostsData : totalLossCostsData.slice(0, 20),
              '#FF4500',
              'Total Loss Costs'
            )}

            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 'normal' }}> Tổng Doanh Thu </span>:{' '}
              <span style={{ fontSize: 30 }}>{formatPrize(data?.totalRevenue)}</span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default DashBoardChartPage
