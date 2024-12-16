import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryCostType } from '@/queries/cost-type'
import { useQueryLossCost, useUpdatelossCostMutation } from '@/queries/fixed-cost'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataTypeCost } from '@/types/DataType'
import { Button, Col, DatePicker, Form, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const EditFixedCostPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const fixedcostTypeID: string | number | null = searchParams.get('id')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (fixedcostTypeID === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  const updateMutation = useUpdatelossCostMutation()

  const navigate = useNavigate()

  const { data, refetch } = useQueryLossCost()

  const { data: vehicleData } = useQueryVehicles()

  const { data: costTypeData } = useQueryCostType()

  useEffect(() => {
    if (data && Array.isArray(data.listLossCostVehicle)) {
      const formData = data.listLossCostVehicle.find((item: DataTypeCost) => item.id === Number(fixedcostTypeID))
      if (formData) {
        const updatedFormData = {
          ...formData,
          dateIncurred: dayjs(formData.dateIncurred)
        }
        form.setFieldsValue(updatedFormData)
      }
    }
  }, [data, fixedcostTypeID, form])

  const tableData: TableData[] = [
    {
      key: 'description',
      label: 'Mô tả',
      value: (
        <Form.Item name='description' rules={[{ required: true, message: 'Vui lòng nhập Mô tả!' }]}>
          <TextArea style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'price',
      label: 'Giá chi phí',
      value: (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá chi phí!' }]}>
          <InputNumber style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'vehicleId',
      label: 'Biển số xe',
      value: (
        <Form.Item name='vehicleId' rules={[{ required: true, message: 'Vui lòng chọn xe!' }]}>
          <Select placeholder='Chọn xe' style={{ width: '30%' }}>
            {vehicleData?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.licensePlate}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'lossCostTypeId',
      label: 'Loại chi phí',
      value: (
        <Form.Item name='lossCostTypeId' rules={[{ required: true, message: 'Vui lòng chọn loại chi phí!' }]}>
          <Select placeholder='Chọn loại chi phí' style={{ width: '30%' }}>
            {costTypeData?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'dateIncurred',
      label: 'Ngày phát sinh',
      value: (
        <Form.Item name='dateIncurred' rules={[{ required: true, message: 'Vui lòng chọn ngày phát sinh!' }]}>
          <DatePicker
            showTime={{
              format: 'HH:mm:ss' // Optional: Customize the time format
            }}
            format='YYYY-MM-DD HH:mm:ss'
            style={{ width: '30%' }}
            onChange={(date) => console.log(date?.toISOString())}
          />
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

  const handleFormSubmit = async (values: DataTypeCost) => {
    setIsLoading(true)
    try {
      const response = await updateMutation.mutateAsync({ id: fixedcostTypeID, body: values })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        refetch()
        navigate('/fixed-cost')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey='key' />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button
            type='primary'
            htmlType='submit'
            style={{ marginRight: '10px' }}
            loading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default EditFixedCostPage
