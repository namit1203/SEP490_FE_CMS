import UploadComponent from '@/components/upload'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useQueryDriver, useQueryDriverDetails, useUpdateDriverMutation } from '@/queries/driver'
import { DataTypeDriver } from '@/types/DataType'
import { Button, Col, DatePicker, Form, Input, message, Row, Switch, Table, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const EditDriverPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const driverId = searchParams.get('id')

  const [form] = Form.useForm()

  const { data, refetch: refetchDriver } = useQueryDriverDetails({ id: driverId })

  const { refetch } = useQueryDriver()

  const updateMutation = useUpdateDriverMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  if (driverId === null) {
    throw new Error('Invalid driverId')
  }

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        dob: dayjs(data.dob)
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [data, form])

  useEffect(() => {
    refetchDriver()
  }, [driverId, refetchDriver])

  const tableData: TableData[] = [
    {
      key: 'name',
      label: 'Họ và tên',
      value: (
        <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
          <Input placeholder='Nhập họ và tên' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'userName',
      label: 'Tên đăng nhập',
      value: (
        <Form.Item name='userName' rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
          <Input placeholder='Nhập tên đăng nhập' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'email',
      label: 'Email',
      value: (
        <Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input placeholder='Nhập email' style={{ width: '30%' }} type='email' />
        </Form.Item>
      )
    },
    {
      key: 'numberPhone',
      label: 'Số điện thoại',
      value: (
        <Form.Item
          name='numberPhone'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            {
              pattern: /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/,
              message: 'Số điện thoại không hợp lệ!'
            }
          ]}
        >
          <Input placeholder='Nhập số điện thoại' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'license',
      label: 'Biển số xe',
      value: (
        <Form.Item name='license' rules={[{ required: true, message: 'Vui lòng nhập biển số xe!' }]}>
          <Input placeholder='Nhập biển số xe' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'avatar',
      label: 'Hình ảnh',
      value: <UploadComponent initialImage={data?.avatar} fieldName={'avatar'} form={form} />
    },
    {
      key: 'dob',
      label: 'Ngày sinh',
      value: (
        <Form.Item name='dob' rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
          <DatePicker
            showTime={{
              format: 'HH:mm:ss'
            }}
            format='YYYY-MM-DD HH:mm:ss'
            onChange={(date) => console.log(date?.toISOString())}
          />
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      value: (
        <Form.Item name='status' rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}>
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

  const handleFormSubmit = async (values: DataTypeDriver) => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await updateMutation.mutateAsync({ id: driverId, body: formData })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        refetch()
        navigate('/driver')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Update failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
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

export default EditDriverPage
