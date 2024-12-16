import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryTripDetail, useQueryTypeOfTrips, useUpdateTripMutation } from '@/queries/trip'
import { useQueryVehiclesNoTrip } from '@/queries/vehicle'
import { Field } from '@/types/DataType'
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const EditTripPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const tripID: string | number | null = searchParams.get('id')
  const { Option } = Select

  if (tripID === null) {
    throw new Error('Invalid trip ID')
  }

  const [form] = Form.useForm()

  const { data: dataTypeTrips } = useQueryTypeOfTrips()

  const { data: formData, refetch, isLoading } = useQueryTripDetail({ id: tripID })

  const { data: dataVehicleNoTrip, isLoading: isLoadingVehicles } = useQueryVehiclesNoTrip()

  const updateMutation = useUpdateTripMutation()

  const navigate = useNavigate()

  const getOnlyLicensePlate = dataVehicleNoTrip?.map((vehicle: any) => ({
    value: vehicle.id,
    label: vehicle.licensePlate
  }))

  const [selectedValue, setSelectedValue] = useState(formData?.vehicleId)

  const handleChange = (value: string) => {
    setSelectedValue(value)
    console.log('Selected value:', value) // You can handle the selected value here
  }

  const [fields, setFields] = useState<Field[]>([])

  useEffect(() => {
    if (!isLoadingVehicles && !isLoading && dataTypeTrips && dataVehicleNoTrip) {
      setFields([
        {
          name: 'name',
          label: 'Name',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
        },
        {
          name: 'startTime',
          label: 'Start Time',
          component: (
            <DatePicker
              picker='time' // Use time-only picker
              format='HH:mm:ss'
            />
          ),
          rules: [{ required: true, message: 'Vui lòng chọn giờ khởi hành!' }]
        },
        {
          name: 'price',
          label: 'Price',
          component: <InputNumber style={{ width: '100%' }} />,
          rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
        },
        {
          name: 'pointStart',
          label: 'Point Start',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
        },
        {
          name: 'pointEnd',
          label: 'Point End',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
        },
        {
          name: 'licensePlate',
          label: 'Vehicle',
          component: (
            <Select
              showSearch
              placeholder='Select a Vehicle'
              filterOption={(input: any, option: any) => (option?.label ?? '').includes(input.toLowerCase())}
              onChange={handleChange} // Handle the change event
              value={selectedValue} // Optionally set the selected value if you want to control it
              options={getOnlyLicensePlate.map((item: any) => ({
                value: `${item.value}`, // Ensure uniqueness by appending the index
                label: item.label,
                key: `${item.value}` // Optionally include key for clarity
              }))}
            />
          ),
          rules: [{ required: true, message: 'Vui lòng nhập biển số xe' }]
        },
        {
          name: 'typeOfTrip',
          label: 'Type Of Trips',
          component: (
            <Select placeholder='Chọn kiểu chuyến' style={{ width: '100%' }}>
              {dataTypeTrips.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          ),
          rules: [{ required: true, message: 'Vui lòng chọn tài xế!' }]
        },
        {
          name: 'description',
          label: 'Description',
          component: <TextArea />,
          rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
        },
        {
          type: 'button' // A special type to indicate this is a button
        },
        {
          name: 'status',
          label: 'Trạng thái',
          component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
          valuePropName: 'checked'
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dataTypeTrips, isLoadingVehicles, dataVehicleNoTrip])

  useEffect(() => {
    if (formData) {
      const updatedFormData = {
        ...formData,
        startTime: formData.startTime
          ? dayjs(formData.startTime, 'HH:mm:ss') // Parse time-only format
          : null
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [formData, form])

  useEffect(() => {
    refetch()
  }, [tripID, refetch])

  const handleFormSubmit = async (values: any) => {
    const outputData = {
      name: values.name,
      vehicleId: selectedValue,
      startTime: dayjs(values.startTime).format('HH:mm:ss'), // Ensure startTime is in 'HH:mm:ss' format
      price: values.price,
      pointStart: values.pointStart,
      pointEnd: values.pointEnd,
      typeOfTrip: values.typeOfTrip,
      description: values.description,
      status: values.status
    }

    console.log(values)

    try {
      if (tripID) {
        const response = await updateMutation.mutateAsync({ id: tripID, body: outputData })
        if (response.status === HttpStatusCode.Ok) {
          message.success('Update successfully')
          navigate('/trips')
        } else {
          message.error('Update failed')
        }
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {fields.map((field, index) => {
        if (field.type === 'button') {
          return (
            <Form.Item key={`button_${index}`} style={{ marginBottom: 16 }}>
              <Link to={`/trips/list-trip-detail?id=${tripID}`}>
                <Button color='primary' variant='dashed'>
                  Trip Details
                </Button>
              </Link>
            </Form.Item>
          )
        }

        return (
          <Form.Item
            key={String(field.name)} // Ensure key is a string
            name={field.name as string} // Ensure name is always a string
            label={field.label}
            rules={field.rules || []}
          >
            {field.component}
          </Form.Item>
        )
      })}
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default EditTripPage
