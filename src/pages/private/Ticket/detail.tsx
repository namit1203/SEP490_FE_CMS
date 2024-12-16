import { useQueryTicketDetails } from '@/queries/ticket'
import { useQueryTrips } from '@/queries/trip'
import { useQueryTypeOfVehicles } from '@/queries/vehicle'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Col, Form, Row, Table } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const DetailTicketPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const ticketID = searchParams.get('id')
  const navigate = useNavigate()

  const { data: ticketData, refetch, isLoading } = useQueryTicketDetails({ id: ticketID })

  const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles()
  const { data: dataTypeOfTrip } = useQueryTrips()

  //   useEffect(() => {
  //     if (formData) {
  //       const updatedFormData = {
  //         ...formData,
  //         startDate: dayjs(formData.startDate),
  //         endDate: dayjs(formData.endDate)
  //       }

  //       form.setFieldsValue(updatedFormData)
  //     }
  //   }, [formData, form])

  useEffect(() => {
    refetch()
  }, [ticketID, refetch])

  const tableData = useMemo(() => {
    const vehicleDescription =
      dataTypeOfVehicles?.find((vehicle: { id: number }) => vehicle.id === ticketData?.vehicleId)?.description || 'N/A'

    const tripDescription =
      dataTypeOfTrip?.find((trip: { id: number }) => trip.id === ticketData?.tripId)?.description || 'N/A'

    return [
      { key: 'description', label: 'Mô tả', value: ticketData?.description || 'N/A' },
      { key: 'price', label: 'Giá', value: ticketData?.price?.toLocaleString('vi-VN') + ' VND' || 'N/A' },
      { key: 'codePromotion', label: 'Mã khuyến mãi', value: ticketData?.codePromotion || 'N/A' },
      {
        key: 'pricePromotion',
        label: 'Giá khuyến mãi',
        value: ticketData?.pricePromotion?.toLocaleString('vi-VN') + ' VND' || 'N/A'
      },
      { key: 'seatCode', label: 'Mã ghế', value: ticketData?.seatCode || 'N/A' },
      { key: 'pointStart', label: 'Điểm khởi hành', value: ticketData?.pointStart || 'N/A' },
      { key: 'pointEnd', label: 'Điểm đến', value: ticketData?.pointEnd || 'N/A' },
      {
        key: 'timeFrom',
        label: 'Thời gian khởi hành',
        value: ticketData?.timeFrom ? new Date(ticketData.timeFrom).toLocaleString('vi-VN') : 'N/A'
      },
      {
        key: 'timeTo',
        label: 'Thời gian đến',
        value: ticketData?.timeTo ? new Date(ticketData.timeTo).toLocaleString('vi-VN') : 'N/A'
      },
      { key: 'typeOfPayment', label: 'Hình thức thanh toán', value: ticketData?.typeOfPayment || 'N/A' },
      { key: 'licsenceVehicle', label: 'Biển số xe', value: ticketData?.licsenceVehicle || 'N/A' },
      { key: 'note', label: 'Ghi chú', value: ticketData?.note || 'N/A' },
      //   { key: 'userId', label: 'ID người dùng', value: ticketData?.userId || 'N/A' },
      { key: 'fullName', label: 'Họ tên', value: ticketData?.fullName || 'N/A' },
      { key: 'vehicleId', label: 'Phương tiện', value: vehicleDescription },
      { key: 'tripId', label: 'ID chuyến đi', value: tripDescription || 'N/A' },
      { key: 'status', label: 'Trạng thái', value: ticketData?.status || 'N/A' }
    ]
  }, [ticketData, dataTypeOfVehicles, dataTypeOfTrip])

  const columns = useMemo(
    () => [
      {
        title: 'Key',
        dataIndex: 'label',
        key: 'label',
        width: '30%'
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '70%'
      }
    ],
    []
  )

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <Form layout='vertical'>
            <Table columns={columns} dataSource={tableData} pagination={false} bordered />
            <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
              <Col>
                <Button type='primary' onClick={() => navigate('/ticket')} style={{ marginRight: '10px' }}>
                  Back
                </Button>
              </Col>
            </Row>
          </Form>
        )
      })}
    </>
  )
}

export default DetailTicketPage
