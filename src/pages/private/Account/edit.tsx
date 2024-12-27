import { useQueryAccount, useQueryAccountDetails, useQueryRole, useUpdateRoleAccountMutation } from '@/queries/account'
import { DataTypeUser } from '@/types/DataType'
import { Button, Col, Form, message, Row, Select, Table, TableColumnsType } from 'antd'
import { HttpStatusCode } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const EditAccountPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const route_id: string | number | null = searchParams.get('id')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data } = useQueryAccountDetails({ id: route_id })

  const { refetch } = useQueryAccount()

  const { data: roleData } = useQueryRole()

  const updateMutation = useUpdateRoleAccountMutation()

  if (route_id === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const tableData: TableData[] = [
    { key: 'username', label: 'Username', value: data?.username || 'N/A' },
    { key: 'email', label: 'Email', value: data?.email || 'N/A' },
    { key: 'numberPhone', label: 'Số điện thoại', value: data?.numberPhone || 'N/A' },
    { key: 'fullName', label: 'Họ và tên', value: data?.fullName || 'N/A' },
    { key: 'address', label: 'Địa chỉ', value: data?.address || 'N/A' },
    {
      key: 'role',
      label: 'Quyền',
      value: (
        <Form.Item name='role' rules={[{ required: true, message: 'Vui lòng chọn Role!' }]}>
          <Select placeholder='Chọn Role' style={{ width: '30%' }}>
            {roleData
              ?.filter((item: any) => item.status === true) // Only include items with status === true
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
      const response = await updateMutation.mutateAsync({ id: route_id, newRoleId: values.role })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        refetch()
        navigate('/account')
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

export default EditAccountPage
