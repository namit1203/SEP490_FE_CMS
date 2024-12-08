import ModalForm, { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatDate } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import {
  useAddCostTypeMutation,
  useDeleteCostTypeMutation,
  useQueryCostType,
  useUpdateCostTypeMutation
} from '@/queries/cost-type'
import { DataTypeCost } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, Form, message, Popconfirm, Space, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

interface DataType {
  id: number
  key: string
  description: string
  createdAt: number
  updateAt: number
  status: boolean
}

const CostTypePage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryCostType()

  const updateMutation = useUpdateCostTypeMutation()

  const addMutation = useAddCostTypeMutation()

  const deleteMutaion = useDeleteCostTypeMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [mode, setMode] = useState('add')

  const [selectedItem, setSelectedItem] = useState<DataTypeCost | null>(null)

  const [form] = Form.useForm()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleEdit = (item: DataTypeCost) => {
    setMode('edit')
    setSelectedItem(item)
    setIsModalOpen(true)
    form.setFieldsValue(item)
  }

  const handleAsyncAdd = async (values: DataTypeCost) => {
    return await addMutation.mutateAsync(values)
  }

  const handleAsyncEdit = async (values: DataTypeCost) => {
    return await updateMutation.mutateAsync({ id: selectedItem?.id, body: values })
  }
  const handleFormSubmit = async (values: DataTypeCost) => {
    try {
      const response = mode === 'add' ? await handleAsyncAdd(values) : await handleAsyncEdit(values)

      if (response?.status === HttpStatusCode.Ok) {
        message.success(response?.message || `${mode === 'add' ? 'Added' : 'Updated'} successfully`)
        refetch()
      } else {
        message.error(`${mode === 'add' ? 'Add' : 'Update'} failed`)
      }
    } catch (error: any) {
      message.error('An unexpected error occurred.', error)
    } finally {
      setIsModalOpen(false)
      setSelectedItem(null)
    }
  }

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetch()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const openAddModal = () => {
    setMode('add')
    console.log('Before clearing:', selectedItem)
    setSelectedItem(null)
    console.log('After clearing:', selectedItem)
    // setSelectedItem(null)
    setTimeout(() => setIsModalOpen(true), 0) // Open modal after state updates
    form.resetFields()
  }

  useEffect(() => {
    if (mode === 'add') {
      setSelectedItem(null)
    }
  }, [mode])

  const fields: ModalFormProps<DataTypeCost>['fields'] = [
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    }
  ]

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Loại chi phí',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '30%'
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date) => <span>{formatDate(date)}</span>,
      width: '30%'
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align: 'center',
      render: (date) => <span>{formatDate(date)}</span>,
      width: '25%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              console.log(record)
              handleEdit(record)
            }}
            type='primary'
          >
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button onClick={() => openAddModal()} type='primary' icon={<PlusOutlined />} ghost>
                Thêm mới
              </Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
            <ModalForm
              form={form}
              isVisible={isModalOpen}
              onSubmit={handleFormSubmit}
              initialValues={selectedItem}
              fields={fields}
              setIsModalOpen={setIsModalOpen}
              setSelectedItem={setSelectedItem}
            />
          </>
        )
      })}
    </>
  )
}
export default CostTypePage
