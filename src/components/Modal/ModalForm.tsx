import React from 'react'
import { Modal, Form } from 'antd'

interface ModalFormProps<T> {
  isVisible: boolean
  onSubmit: (values: T) => void
  initialValues: T | null
  fields: {
    name?: keyof T
    label?: string
    component: React.ReactNode
    rules?: any[]
    description?: string
  }[]
}

function ModalForm<T>({ isVisible, onSubmit, initialValues, fields }: ModalFormProps<T>) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
  }

  const handleFinish = (values: T) => {
    onSubmit(values)
    handleCancel()
  }

  return (
    <Modal title='Edit Item' open={isVisible} onOk={handleOk} onCancel={handleCancel}>
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
