import { ModalFormProps } from '@/components/Modal/ModalForm'
import { useQueryTicketDetails, useUpdateTicketMutation } from '@/queries/ticket'
// import { useQueryTrips } from '@/queries/trip'
// import { useQueryTypeOfVehicles } from '@/queries/vehicle'
import { DataType } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, DatePicker, Form, Input, InputNumber, message, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EditTicketPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const ticketID = searchParams.get('id')
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const { data: ticketData, refetch, isLoading } = useQueryTicketDetails({ id: ticketID })

  //   const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles()
  //   const { data: dataTypeOfTrip } = useQueryTrips()

  const updateMutation = useUpdateTicketMutation()

  //   console.log(ticketData)

  useEffect(() => {
    if (ticketData) {
      const updatedFormData = {
        ...ticketData,
        timeFrom: dayjs(ticketData.timeFrom),
        timeTo: dayjs(ticketData.timeTo)
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [ticketData, form])

  useEffect(() => {
    refetch()
  }, [ticketID, refetch])

  const fields: ModalFormProps<DataType>['fields'] = [
    {
      name: 'price',
      label: 'Giá gốc',
      component: <Input disabled={true} />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'fullName',
      label: 'Người đặt vé',
      component: <Input disabled={true} />,
      rules: [{ required: true, message: 'Vui lòng nhập link ảnh!' }]
    },
    {
      name: 'pricePromotion',
      label: 'Giá khuyến mãi',
      component: <InputNumber style={{ width: '100%' }} />
    },
    {
      name: 'codePromotion',
      label: 'Mã giảm giá',
      component: <Input disabled={true} />
    },
    {
      name: 'pointStart',
      label: 'Điểm xuất phát',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập Điểm xuất phát!' }]
    },
    {
      name: 'pointEnd',
      label: 'Điểm đến',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập Điểm đến!' }]
    },
    {
      name: 'timeFrom',
      label: 'Thời gian bắt đầu',
      component: (
        <DatePicker
          disabled
          showTime={{
            format: 'HH:mm:ss' // Optional: Customize the time format
          }}
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date) => console.log(date?.toISOString())}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]
    },
    {
      name: 'timeTo',
      label: 'Thời gian kết thúc',
      component: (
        <DatePicker
          disabled
          showTime={{
            format: 'HH:mm:ss' // Optional: Customize the time format
          }}
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date) => console.log(date?.toISOString())}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]
    },
    {
      name: 'typeOfPayment',
      label: 'Hình thức thanh toán	',
      component: <Input disabled={true} />,
      rules: [{ required: true, message: 'Vui lòng nhập Điểm đến!' }]
    },
    {
      name: 'licsenceVehicle',
      label: 'Biển số xe',
      component: <Input disabled={true} />,
      rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
    },
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />
    },
    {
      name: 'status',
      label: 'Trạng thái',
      component: <Switch disabled checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
      valuePropName: 'checked'
    },
    {
      name: 'note',
      label: 'Ghi chú',
      component: <Input />
    }
  ]

  const handleFormSubmit = async (values: DataType) => {
    try {
      if (ticketID) {
        const { pricePromotion, pointStart, pointEnd, description, note } = values

        const valueSubmit = {
          pricePromotion,
          pointStart,
          pointEnd,
          description,
          note
        }

        const response = await updateMutation.mutateAsync({ id: ticketID, body: valueSubmit })
        console.log(response)

        if (response.status === HttpStatusCode.Ok) {
          message.success('Update successfully')
          navigate('/ticket')
        } else {
          message.error('Update failed')
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
            {fields.map((field) => (
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
      })}
    </>
  )
}

export default EditTicketPage
