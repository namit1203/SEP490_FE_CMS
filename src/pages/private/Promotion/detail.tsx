import { useQueryPromotionDetails } from '@/queries/promotions'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const DetailPromotionPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const promotionID = searchParams.get('id')
  const [form] = Form.useForm()

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

  return (
    <Form form={form} layout='vertical' initialValues={{}}>
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
      <Link to='/promotion'>
        <Button type='primary'>Back</Button>
      </Link>
    </Form>
  )
}

export default DetailPromotionPage
