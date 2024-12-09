import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryCostType, useUpdateCostTypeMutation } from '@/queries/cost-type'
import { DataTypeCost } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EditCostTypePage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const costTypeID: string | number | null = searchParams.get('id')

  if (costTypeID === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  const updateMutation = useUpdateCostTypeMutation()

  const navigate = useNavigate()

  const { data: formData, refetch } = useQueryCostType()

  useEffect(() => {
    if (formData && Array.isArray(formData)) {
      const selectedItem = formData.find((item) => item.id === Number(costTypeID))
      if (selectedItem) {
        form.setFieldsValue(selectedItem)
      }
    }
  }, [formData, costTypeID, form])

  const filteredFields = fieldModalTable.filter((field) => field.name && ['description'].includes(field.name))

  const handleFormSubmit = async (values: DataTypeCost) => {
    setIsLoading(true)
    try {
      const response = await updateMutation.mutateAsync({ id: costTypeID, body: values })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        refetch()
        navigate('/cost-type')
      } else {
        message.error('Update failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
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

export default EditCostTypePage
