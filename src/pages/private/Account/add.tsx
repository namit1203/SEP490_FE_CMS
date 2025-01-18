import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useCreateAccountMutation, useQueryAccount, useQueryRole } from '@/queries/account'
import { DataTypeUser } from '@/types/DataType'
import { Button, Col, Form, Input, message, Row, Select, Table, TableColumnsType } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}
const addAsterisk = (label: string, isRequired: boolean) => {
  return (
    <>
      {label}
      {isRequired && <span style={{ color: 'red' }}> *</span>}
    </>
  )
}
const AddAccountPage: React.FC = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refetch } = useQueryAccount()

  const { data: roleData } = useQueryRole()

  const createNewMutation = useCreateAccountMutation()

  const [form] = Form.useForm()

  const tableData: TableData[] = [
    {
      key: 'fullName',
      label: addAsterisk('Họ và tên', true),
      value: (
        <Form.Item name='fullName' rules={[{ required: true, message: 'Vui lòng nhập fullName' }]}>
          <Input style={{ width: '30%' }} placeholder='Nhập fullName' />
        </Form.Item>
      )
    },
    {
      key: 'username',
      label: addAsterisk('Username', true),
      value: (
        <Form.Item name='username' rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
          <Input style={{ width: '30%' }} placeholder='Nhập username' />
        </Form.Item>
      )
    },
    {
      key: 'email',
      label: addAsterisk('Email', true),
      value: (
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không đúng định dạng' }
          ]}
        >
          <Input style={{ width: '30%' }} placeholder='Nhập email' />
        </Form.Item>
      )
    },
    {
      key: 'password',
      label: addAsterisk('Mật khẩu', true),
      value: (
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, max: 12, message: 'Mật khẩu phải có từ 6-12 ký tự' }
          ]}
        >
          <Input style={{ width: '30%' }} placeholder='Nhập mật khẩu' />
        </Form.Item>
      )
    },
    {
      key: 'numberPhone',
      label: addAsterisk('Số điện thoại', true),
      value: (
        <Form.Item
          name='numberPhone'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: new RegExp('^(0|84)[0-9]{9,10}$'),
              message: 'Số điện thoại không đúng định dạng'
            }
          ]}
        >
          <Input style={{ width: '30%' }} type='number' placeholder='Nhập số điện thoại' />
        </Form.Item>
      )
    },
    {
      key: 'role',
      label: addAsterisk('Quyền', true),
      value: (
        <Form.Item name='roleId' rules={[{ required: true, message: 'Vui lòng chọn Role!' }]}>
          <Select placeholder='Chọn Role' style={{ width: '30%' }}>
            {roleData
              ?.filter((item: any) => item.status === true)
              .map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.roleName}
                </Select.Option>
              ))}
          </Select>
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

  const handleFormSubmit = async (values: DataTypeUser) => {
    setIsLoading(true)
    try {
      const response = await createNewMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        refetch()
        navigate('/account')
      } else {
        message.error('Add failed')
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
            Create Account
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddAccountPage
