import UploadComponent from '@/components/upload'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useLoading } from '@/context/LoadingContext'
import { useQueryDriver } from '@/queries/driver'
import { useAddVehiclesMutation, useQueryTypeOfVehicles, useQueryTypeVehiclesOwner } from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { Button, Col, Form, Input, InputNumber, message, Row, Select, Switch, Table, TableColumnsType } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const AddVehiclePage: React.FC = () => {
  const [form] = Form.useForm()

  const { data: dataTypeDriver } = useQueryDriver()
  const { data: dataTypeOfVehicles } = useQueryTypeOfVehicles()
  const { data: dataTypeOfVehiclesOwner } = useQueryTypeVehiclesOwner()

  const addMutation = useAddVehiclesMutation()

  const navigate = useNavigate()

  const { isLoadingGlobal } = useLoading()

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
        <Form.Item name='driverId'>
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
      value: <UploadComponent fieldName='image' form={form} />
    },
    {
      key: 'numberSeat',
      label: 'Số ghế ngồi',
      value: (
        <Form.Item name='numberSeat' rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]}>
          <InputNumber style={{ width: '30%' }} placeholder='Nhập số chỗ ngồi' />
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
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await addMutation.mutateAsync(formData)
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
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey='key' />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button disabled={isLoadingGlobal} type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddVehiclePage
