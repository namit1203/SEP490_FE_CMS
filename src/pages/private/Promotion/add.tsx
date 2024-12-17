import UploadComponent from '@/components/upload'
import { useLoading } from '@/context/LoadingContext'
import { useAddPromotionMutation, useAddPromotionToAllUserMutation } from '@/queries/promotions'
import { DataTypeVehicle } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Button, message } from 'antd'
import { HttpStatusCode } from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddPromotionPage: React.FC = () => {
  const [form] = Form.useForm()
  const addMutation = useAddPromotionMutation()
  const addAllMutation = useAddPromotionToAllUserMutation()
  const navigate = useNavigate()
  const { isLoadingGlobal } = useLoading()

  const filteredFields = fieldModalTable.filter(
    (field) =>
      field.name &&
      ['codePromotion', 'description', 'discount', 'exchangePoint', 'imagePromotion', 'startDate', 'endDate'].includes(
        field.name
      )
  )

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'startDate' || key === 'endDate') {
          const date = new Date(value)
          date.setDate(date.getDate() + 1) // Add one day to the date
          const updatedDate = date.toISOString() // Convert to ISO string
          formData.append(key, updatedDate) // Append updated date to formData
        } else {
          formData.append(key, value)
        }
      })

      const response = await addMutation.mutateAsync(formData)

      if (response.status === HttpStatusCode.Created) {
        message.success('Create promotion success')
        navigate('/promotion')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  const handleAddPromotionToAllUser = async () => {
    try {
      const values = form.getFieldsValue()
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await addAllMutation.mutateAsync(formData)

      if (response.status === HttpStatusCode.Ok) {
        message.success('Create promotion success')
        navigate('/promotion')
      } else {
        message.error(response.data)
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical' initialValues={{}}>
      {filteredFields.map((field) => (
        <Form.Item
          key={String(field.name)} // Ensure key is a string
          name={field.name as string} // Ensure name is always a string
          label={field.label}
          rules={field.rules || []}
        >
          {field.name === 'imagePromotion' ? (
            <UploadComponent fieldName={'imagePromotion'} form={form} /> // Hiển thị component upload khi field là avatar
          ) : (
            field.component // Hiển thị component mặc định cho các field khác
          )}
        </Form.Item>
      ))}
      <Button disabled={isLoadingGlobal} type='primary' htmlType='submit'>
        Add
      </Button>
      <Button
        onClick={() => handleAddPromotionToAllUser()}
        style={{ marginLeft: 16 }}
        type='primary'
        icon={<PlusOutlined />}
        ghost
        disabled={isLoadingGlobal}
      >
        Thêm promotion cho tất cả user
      </Button>
    </Form>
  )
}

export default AddPromotionPage
