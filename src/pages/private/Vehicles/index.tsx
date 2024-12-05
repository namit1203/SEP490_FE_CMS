import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, Switch, Space, Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { DataType } from '../../../types/DataType'
import { handlingTsUndefined } from '../../../utils/handlingTsUndefined'

import { useQueryVehicles } from '../../../queries/vehicle'

const VehiclesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setSelectedItem] = useState<DataType | null>(null)
  const [form] = Form.useForm()

  const { data } = useQueryVehicles()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleEdit = (item: DataType) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    form.setFieldsValue(item) // Pre-fill the form with selected item's data
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    form.resetFields() // Reset form when closing the modal
  }

  const handleFormSubmit = (values: any) => {
    console.log('Updated values:', values)
    setIsModalOpen(false)
    // You can send updated data to the backend here
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      sorter: (a, b) => handlingTsUndefined(a.licensePlate).localeCompare(handlingTsUndefined(b.licensePlate)),
      width: '25%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      sorter: (a, b) => handlingTsUndefined(a.numberSeat) - handlingTsUndefined(b.numberSeat),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => Number(a.status) - Number(b.status),
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)} type='primary'>
            Edit
          </Button>
          <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
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
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title='Edit Trip'
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseModal}
        cancelButtonProps={{ style: { display: 'none' } }} // Hides the cancel button
        okText='Update' // Change the OK button text to "Update"
      >
        <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
          <Form.Item name='id' noStyle>
            <Input type='hidden' />
          </Form.Item>
          <Form.Item
            label='Tên chuyến đi'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Thời gian khởi hành'
            name='startTime'
            rules={[{ required: true, message: 'Vui lòng nhập thời gian khởi hành!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label='Giá vé' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='Biển số xe'
            name='licensePlate'
            rules={[{ required: true, message: 'Vui lòng nhập Biển số xe' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Điểm đến' name='pointStart' rules={[{ required: true, message: 'Vui lòng nhập điểm đến' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Điểm đi' name='pointEnd' rules={[{ required: true, message: 'Vui lòng nhập điểm đi' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Vui lòng nhập Mô tả' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label='Trạng thái' name='status' valuePropName='checked'>
            <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default VehiclesPage
