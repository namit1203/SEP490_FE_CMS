import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryDriver } from '@/queries/driver'
import {
  useQueryTypeOfVehicles,
  useQueryTypeVehiclesOwner,
  useQueryVehiclesDetails,
  useUpdateVehiclesMutation
} from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { addWebImageLink } from '@/utils/showImage'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
  Table,
  TableColumnsType,
  Upload
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const EditVehiclePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const vehicleID = searchParams.get('id')
  const [form] = Form.useForm()

  const { data: dataTypeDriver } = useQueryDriver()
  const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles()
  const { data: dataTypeOfVehiclesOwner } = useQueryTypeVehiclesOwner()

  const { data: formData, refetch } = useQueryVehiclesDetails({ id: vehicleID })

  const updateMutation = useUpdateVehiclesMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [formData, form])

  useEffect(() => {
    refetch()
  }, [vehicleID, refetch])

  const tableData: TableData[] = [
    {
      key: 'description',
      label: 'Mô tả',
      value: (
        <Form.Item name='description' rules={[{ required: true, message: 'Vui lòng nhập Mô tả!' }]}>
          <TextArea placeholder='Nhập Mô tả' style={{ width: '30%' }} rows={2} />
        </Form.Item>
      )
    },
    {
      key: 'driverId',
      label: 'Tài xế',
      value: (
        <Form.Item name='driverId' rules={[{ required: true, message: 'Vui lòng chọn tài xế!' }]}>
          <Select placeholder='Chọn tài xế' style={{ width: '30%' }}>
            {dataTypeDriver?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'image',
      label: 'Link ảnh',
      value: (
        <>
          <Form.Item name='image' rules={[{ required: true, message: 'Vui lòng nhập link ảnh!' }]}>
            <Upload
              beforeUpload={() => false} // Prevent automatic upload to the server
              onChange={({ fileList }) => {
                const file = fileList[fileList.length - 1]
                if (file.status === 'done') {
                  form.setFieldsValue({
                    image: file.response?.url || file.url // Set the image URL in the form
                  })
                  message.success('Image uploaded successfully')
                } else if (file.status === 'error') {
                  message.error('Image upload failed')
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          {/* Display image preview */}
          {formData?.image && <Image width={100} src={addWebImageLink(formData?.image)} alt='Image' />}
        </>
      )
    },
    {
      key: 'numberSeat',
      label: 'Số ghế ngồi',
      value: (
        <Form.Item name='numberSeat' rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]}>
          <InputNumber style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'licensePlate',
      label: 'Biển số xe',
      value: (
        <Form.Item name='licensePlate' rules={[{ required: true, message: 'Vui lòng nhập Biển số xe!' }]}>
          <Input placeholder='Biển số xe' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'vehicleTypeId',
      label: 'Nhà xe',
      value: (
        <Form.Item name='vehicleTypeId' rules={[{ required: true, message: 'Vui lòng chọn nhà xe!' }]}>
          <Select placeholder='Chọn nhà xe' style={{ width: '30%' }}>
            {dataTypeOfVehicles?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'vehicleOwner',
      label: 'Chủ nhà xe',
      value: (
        <Form.Item name='vehicleOwner' rules={[{ required: true, message: 'Vui lòng chọn chủ nhà xe!' }]}>
          <Select placeholder='Chọn chủ nhà xe' style={{ width: '30%' }}>
            {dataTypeOfVehiclesOwner?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      value: (
        <Form.Item name='status' valuePropName='checked'>
          <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />
        </Form.Item>
      )
    }
  ]

  const columns: TableColumnsType<TableData> = [
    {
      title: 'Key',
      dataIndex: 'label',
      key: 'label',
      width: '30%'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (_, record) => <>{record.value}</>
    }
  ]

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      if (vehicleID) {
        const formData = new FormData()

        // Append form fields to FormData
        Object.keys(values).forEach((key) => {
          // If the field is not the image, append it normally
          if (key !== 'image') {
            formData.append(key, values[key])
          }
        })

        // Check if there's an image file, and append it
        if (values.image && values.image.fileList && values.image.fileList[0]) {
          const imageFile = values.image.fileList[0].originFileObj
          formData.append('imageFile', imageFile)
        }

        const response = await updateMutation.mutateAsync({ id: vehicleID, body: formData })
        console.log(response)

        if (response.status === HttpStatusCode.Ok) {
          message.success('Update successfully')
          navigate('/vehicles')
        } else {
          message.error('Update failed')
        }
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form form={form} onFinish={handleFormSubmit} layout='vertical'>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey='key' />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default EditVehiclePage
