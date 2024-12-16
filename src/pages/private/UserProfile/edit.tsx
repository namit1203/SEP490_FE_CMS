import UploadComponent from '@/components/upload'
import { useLoading } from '@/context/LoadingContext'
import { useQueryUserProfile, useUpdateUserMutation } from '@/queries/user-profile'
import { DataType } from '@/types/DataType'
import { fieldUser } from '@/utils/fieldModalTable'
import renderWithLoading from '@/utils/renderWithLoading'
import { Form, Button, message } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EditUserProfile = () => {
  const [form] = Form.useForm()
  const { data, isLoading: loadingUserProfile } = useQueryUserProfile()
  const navigate = useNavigate()
  const { isLoadingGlobal } = useLoading()

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        imageFile: data.avatar,
        dob: data.dob
          ? dayjs(data.dob) // Parse time-only format
          : null
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [data, form])

  const updateMutation = useUpdateUserMutation()

  const order = [
    'fullName',
    'username',
    'email',
    'dob',
    'password',
    'address',
    'numberPhone',
    'activeCode',
    'role',
    'status',
    'avatar'
  ]

  const filteredFields = fieldUser
    .filter((field) => field.name && order.includes(field.name))
    .sort((a, b) => order.indexOf(a.name as string) - order.indexOf(b.name as string))

  const handleFormSubmit = async (values: DataType) => {
    try {
      const data = {
        ...values,
        dob: dayjs(values.dob)
      }

      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await updateMutation.mutateAsync(formData)

      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        navigate('/user-profile')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {renderWithLoading({
        isLoading: loadingUserProfile,
        content: (
          <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
            {filteredFields.map((field) => (
              <Form.Item
                key={String(field.name)}
                name={field.name as string}
                label={field.label}
                rules={field.rules || []}
              >
                {field.name === 'avatar' ? (
                  <UploadComponent initialImage={data?.avatar} fieldName={'avatar'} form={form} /> // Hiển thị component upload khi field là avatar
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
      })}
    </>
  )
}

export default EditUserProfile
