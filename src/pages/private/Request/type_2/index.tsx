import { ActionType } from '@/enums/enum'
import { formatTime } from '@/helpers'
import { useQueryTravelCarByRequest } from '@/queries/ticket'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, Input, Row, Select, Table, TableColumnsType } from 'antd'
import { useEffect, useMemo } from 'react'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}
const RentVehicleForm = ({ data }: { data: DataTypeRequest | undefined }) => {
  const [form] = Form.useForm()

  const { data: travelData, refetch: refetchTravel } = useQueryTravelCarByRequest(
    { id: data?.requestId },
    {
      enabled: data?.typeRequestId === ActionType.RENT_VEHICLE
    }
  )

  useEffect(() => {
    if (data?.requestId) refetchTravel()
  }, [data?.requestId, refetchTravel])

  const tableData: TableData[] = useMemo(
    () => [
      {
        key: 'vehicleId',
        label: 'Xe',
        value: (
          <Form.Item name='vehicleId' noStyle initialValue={data?.vehicleId}>
            <Select placeholder='Chọn xe' style={{ width: '30%' }}>
              {travelData &&
                travelData.map((item: any) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item?.licensePlate}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        )
      },
      {
        key: 'startTime',
        label: 'Thời gian khởi hành',
        value: data?.startTime ? formatTime(data.startTime) : 'N/A'
      },
      {
        key: 'endTime',
        label: 'Thời gian kết thúc',
        value: data?.endTime ? formatTime(data.endTime) : 'N/A'
      },
      {
        key: 'startLocation',
        label: 'Điểm bắt đầu',
        value: data?.startLocation || 'N/A'
      },
      {
        key: 'endLocation',
        label: 'Điểm kết thúc',
        value: data?.endLocation || 'N/A'
      },
      {
        key: 'seats',
        label: 'Số ghế ngồi',
        value: data?.seats || 'N/A'
      },
      {
        key: 'price',
        label: 'Giá tiền',
        value: (
          <Form.Item
            name='price'
            noStyle
            initialValue={data?.price}
            rules={[
              { required: true, message: 'Vui lòng nhập giá tiền' },
              { pattern: /^\d+$/, message: 'Giá tiền phải là số hợp lệ' }
            ]}
          >
            <Input placeholder='Nhập giá tiền' style={{ width: '30%' }} />
          </Form.Item>
        )
      }
    ],
    [data, travelData]
  )

  const columns: TableColumnsType<TableData> = useMemo(
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
        width: '70%',
        render: (_, record) => <>{record.value}</>
      }
    ],
    []
  )

  const handleFormSubmit = (values: any) => {
    console.log('Form Submitted', values)
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

export default RentVehicleForm
