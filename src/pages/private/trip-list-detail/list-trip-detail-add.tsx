import React from 'react'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { DataType } from '@/types/DataType'
import { useAddListTripDetailMutation } from '@/queries/trip-list-detail'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'

const ListTripDetailAddPage: React.FC = () => {
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const tripDetailID: string | number | null = searchParams.get('tripID')

  const order = ['pointStartDetails', 'timeStartDetils', 'pointEndDetails', 'timeEndDetails', 'status']

  const filteredFields = fieldModalTable
    .filter((field) => field.name && order.includes(field.name))
    .sort((a, b) => order.indexOf(a.name as string) - order.indexOf(b.name as string))

  const addMutation = useAddListTripDetailMutation()

  const handleFormSubmit = async (values: DataType) => {
    const data = {
      ...values,
      timeStartDetils: dayjs(values.timeStartDetils).format('HH:mm:ss'),
      timeEndDetails: dayjs(values.timeEndDetails).format('HH:mm:ss'),
      tripId: tripDetailID
    }

    try {
      if (tripDetailID) {
        const response = await addMutation.mutateAsync({ id: tripDetailID, body: data })
        if (response.status === HttpStatusCode.Ok) {
          message.success('Add successfully')
          navigate(`/trips/list-trip-detail?id=${tripDetailID}`)
        } else {
          message.error('Add failed')
        }
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Add
      </Button>
    </Form>
  )
}

export default ListTripDetailAddPage
