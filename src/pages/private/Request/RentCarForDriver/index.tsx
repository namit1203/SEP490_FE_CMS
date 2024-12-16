import { ActionType, RoleType } from '@/enums/enum'
import { formatTime } from '@/helpers'
import { useQueryVehicleRent } from '@/queries/history'
import { useAddHistoryVehicleMutation, useQueryRequest } from '@/queries/request'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, Input, message, Row, Select, Table, TableColumnsType } from 'antd'
import { HttpStatusCode } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}
const RentCarForDriver = ({
  data,
  account
}: {
  data: DataTypeRequest | undefined
  account: {
    role: string
  }
}) => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isLoadingDeny, setIsLoadingDeny] = useState<boolean>(false)

  const [isCheck, setIsCheck] = useState<boolean>(false)

  const addMutation = useAddHistoryVehicleMutation()

  const { data: requestData, refetch } = useQueryRequest()

  const { data: rentVehicleData } = useQueryVehicleRent(
    { id: data?.requestId ?? null },
    {
      enabled: data?.typeRequestId === ActionType.DRIVER_RENT_VEHICLE
    }
  )

  const filtered = useMemo(() => {
    return requestData?.find((item: DataTypeRequest) => item.id === data?.requestId)
  }, [data?.requestId, requestData])

  useEffect(() => {
    if (filtered && filtered.status !== isCheck) {
      setIsCheck(filtered.status)
    }
  }, [filtered, isCheck])

  const tableData: TableData[] = useMemo(
    () => [
      {
        key: 'vehicleId',
        label: 'Xe thuê',
        value: (
          <Form.Item
            name='vehicleId'
            noStyle
            initialValue={data?.vehicleId}
            rules={[{ required: true, message: 'Vui lòng chọn xe thuê' }]}
          >
            <Select placeholder='Chọn xe thuê' style={{ width: '30%' }}>
              {rentVehicleData &&
                rentVehicleData.map((item: any) => (
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
    [data, rentVehicleData]
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

  const handleAction = async (options: { choose: boolean; vehicleId?: string; price?: number }) => {
    if (options.choose) {
      if (isLoading) return
      setIsLoading(true)
    } else {
      if (isLoadingDeny) return
      setIsLoadingDeny(true)
    }

    try {
      const response = await addMutation.mutateAsync({
        requestId: data?.requestId || null,
        choose: options.choose,
        vehicleId: options.vehicleId ? Number(options.vehicleId) : undefined,
        price: options.price
      })

      if (response.status === HttpStatusCode.Ok) {
        refetch()
        message.success(`${options.choose ? 'Accept' : 'Deny'} successfully`)
        navigate('/request')
      } else {
        message.error(`${options.choose ? 'Accept' : 'Deny'} failed`)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error(`${options.choose ? 'Accept' : 'Deny'} failed`)
    } finally {
      if (options.choose) {
        setIsLoading(false)
      } else {
        setIsLoadingDeny(false)
      }
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={(values) => handleAction({ choose: true, vehicleId: values.vehicleId, price: values.price })}
    >
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      {!isCheck && [RoleType.ADMIN, RoleType.STAFF].includes(account.role as RoleType) && (
        <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
          <Col>
            <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }} loading={isLoading}>
              Accept
            </Button>
          </Col>
          <Col>
            <Button
              type='primary'
              htmlType='button'
              danger
              onClick={() => handleAction({ choose: false })}
              loading={isLoadingDeny}
            >
              Deny
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  )
}

export default RentCarForDriver
