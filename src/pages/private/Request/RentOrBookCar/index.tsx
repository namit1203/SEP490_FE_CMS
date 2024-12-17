import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatPrize, formatTime } from '@/helpers'
import { useQueryVehicleUseRent } from '@/queries/history'
import { useQueryRequest, useUpdateConvenientTripMutation } from '@/queries/request'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}
const RentOrBookCar = ({ data }: { data: DataTypeRequest | undefined }) => {
  const [form] = Form.useForm()

  const { data: requestData, refetch } = useQueryRequest()

  const { data: vehicleData } = useQueryVehicleUseRent({
    date: data?.startTime ?? null
  })

  const [isCheck, setIsCheck] = useState<boolean>(false)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isLoadingDeny, setIsLoadingDeny] = useState<boolean>(false)

  const acceptMutation = useUpdateConvenientTripMutation()

  const filtered = useMemo(() => {
    return requestData?.find((item: DataTypeRequest) => item.id === data?.requestId)
  }, [data?.requestId, requestData])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  useEffect(() => {
    if (filtered && filtered.status !== isCheck) {
      setIsCheck(filtered.status)
    }
  }, [filtered, isCheck])

  const tableData: TableData[] = [
    {
      key: 'username',
      label: 'Username',
      value: data?.username || 'N/A'
    },
    {
      key: 'vehicleId',
      label: 'Xe thuê',
      value: isCheck ? (
        data?.licensePlate ? (
          data?.licensePlate
        ) : (
          'N/A'
        )
      ) : (
        <Form.Item
          name='vehicleId'
          noStyle
          initialValue={data?.vehicleId}
          rules={[{ required: true, message: 'Vui lòng chọn xe thuê' }]}
        >
          <Select placeholder='Chọn xe thuê' style={{ width: '30%' }}>
            {vehicleData &&
              vehicleData.map((item: any) => (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.licensePlate}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'phoneNumber',
      label: 'Số điện thoại',
      value: data?.phoneNumber || 'N/A'
    },
    {
      key: 'promotionCode',
      label: 'Mã khuyến mãi',
      value: data?.promotionCode || 'N/A'
    },
    {
      key: 'startTime',
      label: 'Thời gian khởi hành',
      value: data?.startTime ? formatTime(data.startTime) : 'N/A'
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
      key: 'price',
      label: 'Giá tiền',
      value: isCheck ? (
        data?.price ? (
          `${formatPrize(data.price)}`
        ) : (
          'N/A'
        )
      ) : (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
          <InputNumber style={{ width: '30%' }} placeholder='nhập giá tiền' />
        </Form.Item>
      )
    }
  ]

  const columns: TableColumnsType<TableData> = [
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
  ]

  const handleFormAction = async (
    choose: boolean,
    successMessage: string,
    errorMessage: string,
    vehicleId?: number
  ) => {
    if (isLoading || isLoadingDeny) return

    if (choose) {
      setIsLoading(true)
    } else {
      setIsLoadingDeny(true)
    }

    try {
      const response = await acceptMutation.mutateAsync({
        id: data?.requestId ?? null,
        choose,
        vehicleId: vehicleId ?? null
      })

      if (response.status === HttpStatusCode.Ok) {
        refetch()
        message.success(successMessage)
        navigate('/request')
      } else {
        message.error(errorMessage)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error(errorMessage)
    } finally {
      if (choose) {
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
      onFinish={(values: any) => handleFormAction(true, 'Accept successfully', 'Accept failed', values.vehicleId)}
    >
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      {!isCheck && (
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
              onClick={() => handleFormAction(false, 'Deny successfully', 'Deny failed')}
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

export default RentOrBookCar
