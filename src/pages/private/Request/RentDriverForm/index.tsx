import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { ActionType, RoleType } from '@/enums/enum'
import { formatPrize, formatTime } from '@/helpers'
import { useQueryDriverRent } from '@/queries/history'
import { useAddHistoryDriverMutation, useQueryRequest } from '@/queries/request'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, InputNumber, message, Row, Select, Table, TableColumnsType, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}
const RentDriverForm = ({ data, account }: { data: DataTypeRequest | undefined; account: { role: string } }) => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isLoadingDeny, setIsLoadingDeny] = useState<boolean>(false)

  const [isCheck, setIsCheck] = useState<boolean>(false)

  const addMutation = useAddHistoryDriverMutation()
  const { data: driverData } = useQueryDriverRent({
    id: data?.requestId ?? null
});


  const { data: requestData, refetch } = useQueryRequest()

  const tableData: TableData[] = [
    {
      key: 'driverId',
      label: 'Tài xế',
      value: isCheck ? (
        data?.driverName ? (
          data.driverName
        ) : (
          'N/A'
        )
      ) : (
        <Form.Item name='driverId' noStyle initialValue={data?.driverId}>
          <Select placeholder='Chọn tài xế' style={{ width: '30%' }}>
            {driverData &&
              driverData.map((item: any) => (
                <Select.Option key={item?.id} value={item?.id}>
                  <Tooltip
                    title={`Tên: ${item?.name}, email: ${item?.email}, sdt: ${item?.numberPhone}, tên đăng nhập: ${item?.userName}`}
                  >
                    <span>{item?.name}</span>
                  </Tooltip>
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

  const filtered = useMemo(() => {
    return requestData?.find((item: DataTypeRequest) => item.id === data?.requestId)
  }, [data?.requestId, requestData])

  useEffect(() => {
    if (filtered && filtered.status !== isCheck) {
      setIsCheck(filtered.status)
    }
  }, [filtered, isCheck])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

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

  const handleAction = async (options: { choose: boolean; driverId?: string; price?: number }) => {
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
        driverId: options.driverId ? Number(options.driverId) : undefined,
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
      onFinish={(values) => handleAction({ choose: true, driverId: values.driverId, price: values.price })}
    >
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      {!isCheck && [RoleType.STAFF].includes(account.role as RoleType) && (
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

export default RentDriverForm
