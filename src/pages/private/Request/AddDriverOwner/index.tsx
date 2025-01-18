import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useCreateRequestDriverMutation, useQueryRequest } from '@/queries/request'
import { DataTypeCost } from '@/types/DataType'
import { Button, DatePicker, Form, Input, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}

const AddRequestDriverOwner: React.FC = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const addMutation = useCreateRequestDriverMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refetch } = useQueryRequest()
  const tableData: TableData[] = [
    {
      key: 'price',
      label: (
        <>
          Giá tiền <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
        >
          <InputNumber style={{ width: '30%' }} placeholder="nhập giá tiền" />
        </Form.Item>
      )
    },
    {
      key: 'startLocation',
      label: (
        <>
          Điểm đến <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="startLocation"
          rules={[{ required: true, message: 'Vui lòng nhập điểm đến!' }]}
        >
          <Input placeholder="nhập điểm đến" style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'endLocation',
      label: (
        <>
          Điểm đi <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="endLocation"
          rules={[{ required: true, message: 'Vui lòng nhập điểm đi!' }]}
        >
          <Input placeholder="nhập điểm đi" style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'seats',
      label: (
        <>
          Chọn số ghế <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="seats"
          rules={[{ required: true, message: 'Vui lòng chọn số ghế!' }]}
        >
          <Select placeholder="Chọn xe" style={{ width: '30%' }}>
            {['5', '7', '29', '45'].map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'startTime',
      label: (
        <>
          Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="startTime"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
        >
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
            style={{ width: '30%' }}
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={(current) => {
              const tomorrowStart = dayjs().add(0, 'day').startOf('day')
              return current.isBefore(tomorrowStart)
            }}
          />
        </Form.Item>
      )
    },
    {
      key: 'endTime',
      label: (
        <>
          Ngày kết thúc <span style={{ color: 'red' }}>*</span>
        </>
      ),
      value: (
        <Form.Item
          name="endTime"
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
        >
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
            style={{ width: '30%' }}
            format="YYYY-MM-DD HH:mm:ss"
          />
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

  const handleFormSubmit = async (values: DataTypeCost) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        refetch()
        message.success(response.message)
        navigate('/request')
      } else {
        message.error(`${response.message}. ${response.details}`)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Accept failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form form={form} onFinish={handleFormSubmit} layout="vertical" requiredMark="required">
        <Table columns={columns} dataSource={tableData} pagination={false} bordered />
        <Row justify="start" gutter={16} style={{ marginTop: '16px' }}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading} style={{ marginTop: 16 }}>
            Thuê xe
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default AddRequestDriverOwner
