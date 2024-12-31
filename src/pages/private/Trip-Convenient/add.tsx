import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useAddTripConvenienceMutation } from '@/queries/trip'
import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Switch, Table, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const AddTripConvenientPage: React.FC = () => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const addMutation = useAddTripConvenienceMutation()

  const tableData: TableData[] = [
    {
      key: 'name',
      label: 'Tên chuyến đi',
      value: (
        <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]}>
          <Input placeholder='Nhập tên chuyến đi' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'startTime',
      label: 'Giờ xuất phát',
      value: (
        <Form.Item name='startTime' rules={[{ required: true, message: 'Vui lòng nhập giờ xuất phát!' }]}>
          <DatePicker showTime format='HH:mm:ss' picker='time' onChange={(date) => console.log(date?.toISOString())} />
        </Form.Item>
      )
    },
    {
      key: 'description',
      label: 'Mô tả',
      value: (
        <Form.Item name='description' rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <Input placeholder='Nhập mô tả' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'price',
      label: 'Giá',
      value: (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
          <InputNumber placeholder='Nhập giá' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'pointStart',
      label: 'Điểm bắt đầu',
      value: (
        <Form.Item name='pointStart' rules={[{ required: true, message: 'Vui lòng nhập điểm bắt đầu!' }]}>
          <Input placeholder='Nhập địa điểm bắt đầu' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'pointEnd',
      label: 'Điểm kết thúc',
      value: (
        <Form.Item name='pointEnd' rules={[{ required: true, message: 'Vui lòng nhập điểm kết thúc!' }]}>
          <Input placeholder='Nhập địa điểm kết thúc' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
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
      const formattedData = {
        ...values,
        startTime: dayjs(values.startTime).format('HH:mm:ss')
      }

      const response = await addMutation.mutateAsync(formattedData)

      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        navigate('/trips-convenient')
      } else {
        message.error(`Add failed: ${response.errors.id[0]}`)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Add failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
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
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddTripConvenientPage
