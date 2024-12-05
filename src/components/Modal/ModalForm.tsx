import React from 'react'
import { Modal, Form } from 'antd'

export interface ModalFormProps<T> {
  isVisible: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: T) => void
  initialValues: T | null
  fields: {
    name?: keyof T
    label?: string
    component: React.ReactNode
    rules?: any[]
    description?: string
    valuePropName?: string // Cho phép undefined
  }[]
}

function ModalForm<T>({ isVisible, onSubmit, initialValues, fields, setIsModalOpen }: ModalFormProps<T>) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalOpen(!isVisible)
    form.resetFields()
  }

  const handleFinish = (values: T) => {
    onSubmit(values)
    handleCancel()
  }

  return (
    <Modal
      cancelButtonProps={{ style: { display: 'none' } }}
      okText='Update'
      title='Edit Item'
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form form={form} layout='vertical' initialValues={initialValues || {}} onFinish={handleFinish}>
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
      </Form>
    </Modal>
  )
}

export default ModalForm
