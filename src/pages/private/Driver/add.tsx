import UploadComponent from '@/components/upload'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useLoading } from '@/context/LoadingContext'
import { useAddDriverMutation, useQueryDriver } from '@/queries/driver'
import { DataTypeDriver } from '@/types/DataType'
import { Button, Col, DatePicker, Form, Input, message, Row, Switch, Table, TableColumnsType,Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const AddDriverPage: React.FC = () => {
  const [form] = Form.useForm()

  const addMutation = useAddDriverMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { isLoadingGlobal } = useLoading()

  const navigate = useNavigate()

  const { refetch } = useQueryDriver()

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
      key: 'password',
      label: 'Mật khẩu',
      value: (
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có tối thiểu 6 ký tự!' }
          ]}
        >
          <Input placeholder='Nhập mật khẩu' style={{ width: '30%' }} type='password' />
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
      label: 'Hạng Bằng Lái',
      value: (
        <Form.Item
        name="license"
        rules={[{ required: true, message: 'Vui lòng chọn hạng bằng lái!' }]}
      >
        <Select
          placeholder="Chọn hạng bằng lái"
          style={{ width: '30%' }}
        >
          <Select.Option value="B2">B2</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="D">D</Select.Option>
          <Select.Option value="E">E</Select.Option>
          <Select.Option value="F">F</Select.Option>
        </Select>
      </Form.Item>
      
      )
    },
    {
      key: 'avatar',
      label: 'Hình ảnh',
      value: <UploadComponent fieldName='avatar' form={form} />
    },
    {
      key: 'dob',
      label: 'Ngày sinh',
      value: (
        <Form.Item name='dob' rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
          <DatePicker format='DD-MM-YYYY' onChange={(date) => console.log(date?.toISOString())} />
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      value: (
        <Form.Item name='status' >
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
      const response = await addMutation.mutateAsync(values)

      if (response.status === HttpStatusCode.Created) {
        message.success('Add successfully')
        refetch()
        navigate('/driver')
      } else {
        message.error(`Add failed: ${response.errors.id[0]}`)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Add failed')
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
            loading={isLoading || isLoadingGlobal}
            disabled={isLoading || isLoadingGlobal}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddDriverPage
