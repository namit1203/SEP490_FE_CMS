import { useQueryTripConvenientDetail, useUpdateTripConvenientMutation } from '@/queries/trip'
import { requiredDot } from '@/utils/fieldModalTable'
import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Switch, Table, TableColumnsType } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: React.ReactNode
  value: JSX.Element | string | undefined
}

const EditTripConvenientPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const route_id: string | number | null = searchParams.get('id')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, refetch } = useQueryTripConvenientDetail({ id: route_id })
  const updateMutation = useUpdateTripConvenientMutation()

  if (route_id === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        startTime: data.startTime ? dayjs(data.startTime, 'HH:mm:ss') : null
      }
      form.setFieldsValue(updatedFormData)
    }
  }, [data, form, route_id])

  const tableData: TableData[] = [
    {
      key: 'name',
      label: requiredDot('Tên chuyến đi'),
      value: (
        <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]}>
          <Input placeholder='Nhập tên chuyến đi' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'startTime',
      label: requiredDot('Giờ khởi hành'),
      value: (
        <Form.Item name='startTime' rules={[{ required: true, message: 'Vui lòng nhập giờ khởi hành!' }]}>
          <DatePicker showTime={{ format: 'HH:mm:ss' }} format='HH:mm:ss' picker='time' />
        </Form.Item>
      )
    },
    {
      key: 'description',
      label: requiredDot('Mô tả'),
      value: (
        <Form.Item name='description' rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <TextArea placeholder='Nhập Mô tả' style={{ width: '30%' }} rows={2} />
        </Form.Item>
      )
    },
    {
      key: 'price',
      label: requiredDot('Giá'),
      value: (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
          <InputNumber placeholder='Nhập giá' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'pointStart',
      label: requiredDot('Điểm bắt đầu'),
      value: (
        <Form.Item name='pointStart' rules={[{ required: true, message: 'Vui lòng nhập điểm bắt đầu!' }]}>
          <Input placeholder='Nhập điểm bắt đầu' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'pointEnd',
      label: requiredDot('Điểm kết thúc'),
      value: (
        <Form.Item name='pointEnd' rules={[{ required: true, message: 'Vui lòng nhập điểm kết thúc!' }]}>
          <Input placeholder='Nhập điểm kết thúc' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: requiredDot('Trạng thái'),
      value: (
        <Form.Item name='status' rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}>
          <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />
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

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const newValue = {
        ...values,
        startTime: dayjs(values.startTime).format('HH:mm:ss')
      }
      const response = await updateMutation.mutateAsync({ id: route_id, body: newValue })
      if (response.status === HttpStatusCode.Ok) {
        message.success(response.data)
        refetch()
        navigate('/trips-convenient')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey='key' />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button
            type='primary'
            htmlType='submit'
            style={{ marginRight: '10px' }}
            loading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default EditTripConvenientPage
