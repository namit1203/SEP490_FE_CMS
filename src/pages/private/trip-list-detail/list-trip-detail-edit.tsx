import { useQueryGetTripDetail, useUpdateListTripDetailMutation } from '@/queries/trip-list-detail'
import { DataType } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Form, message } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ListTripDetailEditPage: React.FC = () => {
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const tripId = searchParams.get('tripID')
  const { data: formData, isLoading, refetch } = useQueryGetTripDetail({ id })

  const updateMutation = useUpdateListTripDetailMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (formData) {
      const updatedFormData = {
        ...formData,
        timeStartDetils: formData.timeStartDetils
          ? dayjs(formData.timeStartDetils, 'HH:mm:ss') // Parse time-only format
          : null,
        timeEndDetails: formData.timeEndDetails
          ? dayjs(formData.timeEndDetails, 'HH:mm:ss') // Parse time-only format
          : null
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [formData, form])

  useEffect(() => {
    refetch()
  }, [id, refetch])

  const order = ['pointStartDetails', 'timeStartDetils', 'pointEndDetails', 'timeEndDetails', 'status']

  const filteredFields = fieldModalTable
    .filter((field) => field.name && order.includes(field.name))
    .sort((a, b) => order.indexOf(a.name as string) - order.indexOf(b.name as string))

  const handleFormSubmit = async (values: DataType) => {
    const data = {
      ...values,
      timeStartDetils: dayjs(values.timeStartDetils).format('HH:mm:ss'),
      timeEndDetails: dayjs(values.timeEndDetails).format('HH:mm:ss')
    }

    try {
      if (id && tripId) {
        const response = await updateMutation.mutateAsync({ id, tripID: tripId, body: data })
        if (response.status === HttpStatusCode.Ok) {
          message.success('Update successfully')
          navigate(`/trips/list-trip-detail?id=${tripId}`)
        } else {
          message.error('Add failed')
        }
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
            {filteredFields.map((field) => (
              <Form.Item
                key={String(field.name)}
                name={field.name as string}
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
      })}
    </>
  )
}

export default ListTripDetailEditPage
