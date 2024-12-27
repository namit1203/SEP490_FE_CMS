import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useAddTripMutation, useQueryTypeOfTrips } from '@/queries/trip'
// import { useQueryDriver } from '@/queries/driver'
import { useQueryVehicles } from '@/queries/vehicle'
import { Field } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'

import { Button, DatePicker, Form, Input, message, Select, Switch } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
// import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

const AddTripPage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select

  const addMutation = useAddTripMutation()

  const navigate = useNavigate()

  const { data: dataTypeTrips, isLoading } = useQueryTypeOfTrips()
  const { data: dataVehicles, isLoading: isLoadingVehicles } = useQueryVehicles()

  const getOnlyLicensePlate = dataVehicles?.map((vehicle: any) => ({
    value: vehicle.licensePlate,
    label: vehicle.licensePlate
  }))

  const initialValues = {
    name: '',
    licensePlate: '',
    startTime: null,
    price: '',
    pointStart: '',
    pointEnd: '',
    typeOfTrip: null,
    pointEndDetails: '',
    timeEndDetails: null,
    description: '',
    status: false // Default status to `false`
  }

  const [fields, setFields] = useState<Field[]>([])

  useEffect(() => {
    if (!isLoadingVehicles && !isLoading && dataTypeTrips && dataVehicles) {
      setFields([
        {
          name: 'name',
          label: 'Name',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập tên' }]
        },
        {
          name: 'licensePlate',
          label: 'License Plate',
          component: (
            <Select
              showSearch
              placeholder='Select a License Plate'
              filterOption={(input: any, option: any) => (option?.label ?? '').includes(input.toLowerCase())}
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
          name: 'startTime',
          label: 'Start Time',
          component: (
            <DatePicker
              showTime={{
                format: 'HH:mm:ss' // Ensures the popup time format is clear
              }}
              format='HH:mm:ss' // Format for the input field
              picker='time' // Ensure this matches 'time' for selecting only time
              placeholder='Select Time' // Placeholder text for clarity
            />
          ),
          rules: [{ required: true, message: 'Vui lòng chọn ngày phát sinh!' }]
        },
        {
          name: 'price',
          label: 'Price',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập giá!' }]
        },
        {
          name: 'pointStart',
          label: 'Point Start',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập điểm bắt đầu!' }]
        },
        {
          name: 'pointEnd',
          label: 'Point End',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập điểm kết thúc!' }]
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
          type: 'button' // A special type to indicate this is a button
        },
        {
          name: 'pointEndDetails',
          label: 'Point End Details',
          component: <Input />,
          rules: [{ required: true, message: 'Vui lòng nhập điểm kết thúc chi tiết!' }]
        },
        {
          name: 'timeEndDetails',
          label: 'Time End Details',
          component: (
            <DatePicker
              showTime={{
                format: 'HH:mm:ss' // Ensures the popup time format is clear
              }}
              format='HH:mm:ss' // Format for the input field
              picker='time' // Ensure this matches 'time' for selecting only time
              placeholder='Select Time' // Placeholder text for clarity
            />
          ),
          rules: [{ required: true, message: 'Vui lòng nhập thời gian kết thúc chi tiết!' }]
        },
        {
          name: 'description',
          label: 'Description',
          component: <Input />,
        },
        {
          name: 'status',
          label: 'Trạng thái',
          component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
          valuePropName: 'checked',
          initialValue: false
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dataTypeTrips, isLoadingVehicles, dataVehicles])

  const handleAddFields = () => {
    const newFields = [
      {
        name: `pointStart_${fields.length}`,
        label: 'Point Start Detail',
        component: <Input />,
        rules: [{ required: true, message: 'Vui lòng nhập chi tiết điểm bắt đầu!' }]
      },
      {
        name: `timeStart_${fields.length}`,
        label: 'Time Start Detail',
        component: (
          <DatePicker
            showTime={{
              format: 'HH:mm:ss'
            }}
            format='HH:mm:ss'
            picker='time'
            placeholder='Select Time'
          />
        ),
        rules: [{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]
      }
    ]

    // Find the index of the "status" field to insert new fields before it
    const index = fields.findIndex((field) => field.name === 'pointEndDetails')
    const updatedFields = [
      ...fields.slice(0, index), // Fields before "pointEndDetails"
      ...newFields, // New fields
      ...fields.slice(index) // "pointEndDetails" field and any fields after
    ]
    setFields(updatedFields)
  }

  const handleFormSubmit = async (values: any) => {
    try {
      const pointStartDetail: any = {}
      let isValid = true

      // Step 1: Filter keys starting with 'pointStart_'
      const pointStartKeys = Object.keys(values).filter((key) => key.startsWith('pointStart_'))

      // Step 2: Iterate over each 'pointStart_' key
      pointStartKeys.forEach((key) => {
        const index = key.split('_')[1]
        const point = values[key]
        const timeKey = `timeStart_${index}`
        const time = values[timeKey]

        // Convert time to 'HH:mm:ss' format using dayjs
        const formattedTime = time ? dayjs(time).format('HH:mm:ss') : null

        if (point && formattedTime) {
          if (pointStartDetail[point]) {
            message.error('The start point details has the same name, please specify the location')
            isValid = false
          } else {
            pointStartDetail[point] = formattedTime
          }
        }
      })

      // Step 3: Add the main `pointStart` and `startTime` to `pointStartDetail`
      if (values.pointStart && values.startTime) {
        const formattedStartTime = dayjs(values.startTime).format('HH:mm:ss')
        if (pointStartDetail[values.pointStart]) {
          message.error('The start point details has the same name with start point, please specify the location')
          isValid = false
        } else {
          pointStartDetail[values.pointStart] = formattedStartTime
        }
      }

      // Step 4: Construct the final output data
      const outputData = {
        name: values.name,
        licensePlate: values.licensePlate,
        startTime: dayjs(values.startTime).format('HH:mm:ss'), // Ensure startTime is in 'HH:mm:ss' format
        price: values.price,
        pointStart: values.pointStart,
        pointEnd: values.pointEnd,
        typeOfTrip: values.typeOfTrip,
        pointEndDetail: {
          [values.pointEndDetails]: dayjs(values.timeEndDetails).format('HH:mm:ss') // Format pointEndDetails time
        },
        description: values.description,
        status: values.status,
        pointStartDetail
      }

      // Step 5: Validate the output data
      if (Object.keys(outputData.pointStartDetail).length < 3) {
        message.error(`Need ${3 - Object.keys(pointStartDetail).length} or more point start details`)
        isValid = false
      }

      // Set the condition state based on validation results

      // Step 6: If valid, proceed to submit
      if (isValid) {
        // message.success('Form submitted successfully')
        const response = await addMutation.mutateAsync(outputData)
        if (response.status === HttpStatusCode.Ok) {
          message.success('Add successfully')
          navigate('/trips')
        } else {
          message.error('Add failed')
        }
      }
    } catch (error) {
      console.error('Error processing form values:', error)
      message.error('An error occurred while submitting the form. Please try again.')
    }
  }
  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <Form onFinish={handleFormSubmit} form={form} layout='vertical' initialValues={initialValues}>
            {fields.map((field, index) => {
              if (field.type === 'button') {
                return (
                  <Form.Item key={`button_${index}`} style={{ marginBottom: 16 }}>
                    <Button type='primary' onClick={handleAddFields}>
                      Thêm điểm và thời gian bắt đầu chi tiết
                    </Button>
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
      })}
    </>
  )
}

export default AddTripPage
