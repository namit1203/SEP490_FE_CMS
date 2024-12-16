import { useAddRoleMutation, useQueryRole } from '@/queries/account'
import { DataTypeUser } from '@/types/DataType'
import { Button, Col, Form, Input, message, Row, Switch, Table, TableColumnsType } from 'antd'
import { HttpStatusCode } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const AddRolePage: React.FC = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refetch } = useQueryRole()

  const createNewMutation = useAddRoleMutation()

  const [form] = Form.useForm()

  const tableData: TableData[] = [
    {
      key: 'roleName',
      label: 'Quyền',
      value: (
        <Form.Item name='roleName' rules={[{ required: true, message: 'Vui lòng chọn Role!' }]}>
          <Input style={{ width: '30%' }} placeholder='Chọn Role' />
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

  const handleFormSubmit = async (values: DataTypeUser) => {
    setIsLoading(true)
    try {
      const response = await createNewMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        refetch()
        navigate('/role')
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
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddRolePage
