import { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryCostType } from '@/queries/cost-type'
import { useQueryLossCost, useUpdatelossCostMutation } from '@/queries/fixed-cost'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataTypeCost, DataTypeFixedCost } from '@/types/DataType'
import { Button, DatePicker, Form, InputNumber, message, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EditFixedCostPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const fixedcostTypeID: string | number | null = searchParams.get('id')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (fixedcostTypeID === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  const updateMutation = useUpdatelossCostMutation()

  const navigate = useNavigate()

  const { data, refetch } = useQueryLossCost()

  const { data: vehicleData } = useQueryVehicles()

  const { data: costTypeData } = useQueryCostType()

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formData = data.find((item) => item.id === Number(fixedcostTypeID))
      if (formData) {
        const updatedFormData = {
          ...formData,
          dateIncurred: dayjs(formData.dateIncurred)
        }

        form.setFieldsValue(updatedFormData)
      }
    }
  }, [data, fixedcostTypeID, form])

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
      const response = await updateMutation.mutateAsync({ id: fixedcostTypeID, body: values })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        refetch()
        navigate('/fixed-cost')
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
      {fields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit' loading={isLoading}>
        Update
      </Button>
    </Form>
  )
}

export default EditFixedCostPage
