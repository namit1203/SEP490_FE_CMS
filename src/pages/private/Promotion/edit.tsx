import { useQueryPromotionDetails, useUpdatePromotionMutation } from '@/queries/promotions'
import { DataType } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EditPromotionPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const promotionID = searchParams.get('id')
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const updateMutation = useUpdatePromotionMutation()

  const { data: formData, refetch } = useQueryPromotionDetails({ id: promotionID })

  useEffect(() => {
    if (formData) {
      const updatedFormData = {
        ...formData,
        startDate: dayjs(formData.startDate),
        endDate: dayjs(formData.endDate)
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [formData, form])

  useEffect(() => {
    refetch()
  }, [promotionID, refetch])

  const filteredFields = fieldModalTable.filter(
    (field) =>
      field.name &&
      ['codePromotion', 'description', 'discount', 'exchangePoint', 'imagePromotion', 'startDate', 'endDate'].includes(
        field.name
      )
  )

  const handleSubmit = async (values: DataType) => {
    try {
      const response = await updateMutation.mutateAsync({ id: promotionID, body: values })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')

        navigate('/promotion')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleSubmit} form={form} layout='vertical' initialValues={{}}>
      {filteredFields.map((field) => (
        <Form.Item
          key={String(field.name)} // Ensure key is a string
          name={field.name as string} // Ensure name is always a string
          label={field.label}
          rules={field.rules || []}
        >
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Update
      </Button>
    </Form>
  )
}

export default EditPromotionPage
