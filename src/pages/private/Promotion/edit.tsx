import UploadComponent from '@/components/upload'
import { useLoading } from '@/context/LoadingContext'
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

  const { isLoadingGlobal } = useLoading()

  const { data, refetch } = useQueryPromotionDetails({ id: promotionID })

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate)
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [data, form])

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
      if (promotionID) {
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value)
        })

        const response = await updateMutation.mutateAsync({ id: promotionID, body: formData })
        if (response.status === HttpStatusCode.Ok) {
          message.success('Update successfully')

          navigate('/promotion')
        } else {
          message.error('Update failed')
        }
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
          {field.name === 'imagePromotion' ? (
            <UploadComponent initialImage={data?.imagePromotion} fieldName={'imagePromotion'} form={form} /> // Hiển thị component upload khi field là avatar
          ) : (
            field.component // Hiển thị component mặc định cho các field khác
          )}
        </Form.Item>
      ))}
      <Button disabled={isLoadingGlobal} type='primary' htmlType='submit'>
        Update
      </Button>
    </Form>
  )
}

export default EditPromotionPage
