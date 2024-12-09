import { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryDriver } from '@/queries/driver'
import { useAddVehiclesMutation, useQueryTypeOfVehicles, useQueryTypeVehiclesOwner } from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { Button, Form, Input, InputNumber, message, Select, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

const AddVehiclePage: React.FC = () => {
  const [form] = Form.useForm()
  const { Option } = Select

  const { data: dataTypeDriver } = useQueryDriver()
  const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles()
  const { data: dataTypeOfVehiclesOwner } = useQueryTypeVehiclesOwner()

  const addMutation = useAddVehiclesMutation()

  const navigate = useNavigate()

  const fields: ModalFormProps<DataTypeVehicle>['fields'] = [
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'driverId',
      label: 'Tài xế',
      component: (
        <Select placeholder='Chọn tài xế' style={{ width: '100%' }}>
          {dataTypeDriver?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.userName}
            </Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn tài xế!' }]
    },
    {
      name: 'image',
      label: 'Link ảnh',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập link ảnh!' }]
    },
    {
      name: 'numberSeat',
      label: 'Số ghế ngồi',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]
    },
    {
      name: 'licensePlate',
      label: 'Biển số xe',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
    },
    {
      name: 'vehicleTypeId',
      label: 'Nhà xe',
      component: (
        <Select placeholder='Chọn nhà xe' style={{ width: '100%' }}>
          {dataTypeOfVehicles?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.description}
            </Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn nhà xe!' }]
    },
    {
      name: 'vehicleOwner',
      label: 'Chủ nhà xe',
      component: (
        <Select placeholder='Chọn nhà xe' style={{ width: '100%' }}>
          {dataTypeOfVehiclesOwner?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.username}
            </Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn chủ nhà xe!' }]
    },
    {
      name: 'status',
      label: 'Trạng thái',
      component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
      valuePropName: 'checked'
    }
  ]

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        navigate('/vehicles')
      } else {
        message.error('Add failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
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
        Add
      </Button>
    </Form>
  )
}

export default AddVehiclePage
