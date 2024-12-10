import { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryCostType } from '@/queries/cost-type'
import { useAddLossCostMutation, useQueryLossCost } from '@/queries/fixed-cost'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataTypeCost, DataTypeFixedCost } from '@/types/DataType'
import { Button, DatePicker, Form, InputNumber, message, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddRentVehiclePage: React.FC = () => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addMutation = useAddLossCostMutation()

  const navigate = useNavigate()

  const { refetch } = useQueryLossCost()

  const { data: vehicleData } = useQueryVehicles()

  const { data: costTypeData } = useQueryCostType()

  const fields: ModalFormProps<DataTypeFixedCost>['fields'] = [
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'price',
      label: 'Giá vé',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
    },
    {
      name: 'vehicleId',
      label: 'Biển số xe',
      component: (
        <Select placeholder='Chọn xe' style={{ width: '100%' }}>
          {vehicleData?.map((item: any) => (
            <Select.Option key={item.id} value={item.id}>
              {item.licensePlate}
            </Select.Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn xe!' }]
    },
    {
      name: 'lossCostTypeId',
      label: 'Loại chi phi',
      component: (
        <Select placeholder='Chọn loại chi phí' style={{ width: '100%' }}>
          {costTypeData?.map((item: any) => (
            <Select.Option key={item.id} value={item.id}>
              {item.description}
            </Select.Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn loại chi phí!' }]
    },
    {
      name: 'dateIncurred',
      label: 'Ngày phát sinh',
      component: (
        <DatePicker
          showTime={{
            format: 'HH:mm:ss' // Optional: Customize the time format
          }}
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date) => console.log(date?.toISOString())}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn ngày phát sinh!' }]
    }
  ]
  const handleFormSubmit = async (values: DataTypeCost) => {
    setIsLoading(true)
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        refetch()
        navigate('/fixed-cost')
      } else {
        message.error('Add failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {fields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit' loading={isLoading}>
        Add
      </Button>
    </Form>
  )
}

export default AddRentVehiclePage
