import { Form, Modal } from 'antd'
import React from 'react'

export interface ModalFormProps<T> {
  isVisible: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>
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

function ModalForm<T>({
  isVisible,
  onSubmit,
  initialValues,
  fields,
  setIsModalOpen,
  setSelectedItem
}: ModalFormProps<T>) {
  const [form] = Form.useForm()

  // Synchronize form fields with `initialValues`
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  const handleOk = () => {
    form.submit() // Trigger form submission
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setSelectedItem(null)
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
