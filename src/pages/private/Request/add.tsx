import { ModalFormProps } from '@/components/Modal/ModalForm'
import { DataTypeCost, DataTypeRequest } from '@/types/DataType'
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import { useState } from 'react'

const AddRequestRentVehiclePage: React.FC = () => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fields: ModalFormProps<DataTypeRequest>['fields'] = [
    {
      name: 'price',
      label: 'Giá tiền',
      component: <InputNumber style={{ width: '100%' }} placeholder='nhập giá tiền' />,
      rules: [{ required: true, message: 'Vui lòng nhập giá tiền!' }]
    },
    {
      name: 'startLocation',
      label: 'Điểm đến',
      component: <Input placeholder='nhập điểm đến' />,
      rules: [{ required: true, message: 'Vui lòng nhập giá tiền!' }]
    },
    {
      name: 'endLocation',
      label: 'Điểm đi',
      component: <Input placeholder='nhập điểm đi' />,
      rules: [{ required: true, message: 'Vui lòng nhập giá tiền!' }]
    },
    {
      name: 'price',
      label: 'Giá tiền',
      component: <InputNumber style={{ width: '100%' }} placeholder='nhập giá tiền' />,
      rules: [{ required: true, message: 'Vui lòng nhập giá tiền!' }]
    },
    {
      name: 'seats',
      label: 'Chọn số ghế',
      component: (
        <Select placeholder='Chọn xe' style={{ width: '100%' }}>
          {['5', '7', '29', '45']?.map((item: any) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn xe!' }]
    },
    {
      name: 'startTime',
      label: 'Ngày bắt đầu',
      component: (
        <DatePicker
          showTime={{
            format: 'HH:mm:ss' // Optional: Customize the time format
          }}
          format='YYYY-MM-DD HH:mm:ss'
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]
    },
    {
      name: 'endTime',
      label: 'Ngày kết thúc',
      component: (
        <DatePicker
          showTime={{
            format: 'HH:mm:ss' // Optional: Customize the time format
          }}
          format='YYYY-MM-DD HH:mm:ss'
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]
    }
  ]
  const handleFormSubmit = async (values: DataTypeCost) => {
    setIsLoading(true)
    try {
      console.log(values)
    } catch (error) {
      console.error('Error values:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
        <Row gutter={16}>
          {fields.map((field) => (
            <Col key={String(field.name)} span={12}>
              <Form.Item name={field.name as string} label={field.label} rules={field.rules || []}>
                {field.component}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Thuê xe
        </Button>
      </Form>
      ;
    </>
  )
}

export default AddRequestRentVehiclePage
