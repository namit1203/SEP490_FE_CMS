import { ActionType } from '@/enums/enum'
import { useQueryVehiclesDetails } from '@/queries/vehicle'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, Row, Table } from 'antd'
import { useEffect, useMemo } from 'react'

const AddVehicleForm = ({ data }: { data: DataTypeRequest | undefined }) => {
  const [form] = Form.useForm()

  const { data: vehicleData, refetch: refetchVehicle } = useQueryVehiclesDetails(
    { id: data?.vehicleId },
    {
      enabled: data?.typeRequestId === ActionType.ADD_VEHICLE
    }
  )

  useEffect(() => {
    if (data?.vehicleId) refetchVehicle()
  }, [data?.vehicleId, refetchVehicle])

  const tableData = useMemo(
    () => [
      { key: 'driverName', label: 'Tài xế', value: vehicleData?.driverName || 'N/A' },
      { key: 'vehicleId', label: 'Xe', value: data?.vehicleId || 'N/A' },
      { key: 'numberSeat', label: 'Số ghế ngồi', value: vehicleData?.numberSeat || 'N/A' },
      { key: 'licensePlate', label: 'Biển số xe', value: vehicleData?.licensePlate || 'N/A' },
      { key: 'description', label: 'Mô tả', value: vehicleData?.description || 'N/A' }
    ],
    [vehicleData, data]
  )

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

  const handleFormSubmit = () => {
    console.log('Form Submitted')
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
            Accept
          </Button>
        </Col>
        <Col>
          <Button type='primary' htmlType='button' danger>
            Deny
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddVehicleForm
