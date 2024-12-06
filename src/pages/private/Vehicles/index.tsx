import ModalForm, { ModalFormProps } from '@/components/Modal/ModalForm'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import type { TableProps } from 'antd'
import { Button, Form, Input, InputNumber, Popconfirm, Space, Switch, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

const VehiclesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null)

  const [form] = Form.useForm()

  const { data, isLoading } = useQueryVehicles()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleEdit = (item: DataType) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    form.setFieldsValue(item)
  }

  const handleFormSubmit = (values: any) => {
    console.log('Updated values:', values)
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const fields: ModalFormProps<DataType>['fields'] = [
    {
      name: 'name',
      label: 'Tên chuyến đi',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
    },
    {
      name: 'startTime',
      label: 'Thời gian khởi hành',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập thời gian khởi hành!' }]
    },
    {
      name: 'price',
      label: 'Giá vé',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
    },
    {
      name: 'licensePlate',
      label: 'Biển số xe',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
    },
    {
      name: 'pointStart',
      label: 'Điểm đến',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập điểm đến!' }]
    },
    {
      name: 'pointEnd',
      label: 'Điểm đi',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập điểm đi!' }]
    },
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'status',
      label: 'Trạng thái',
      component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
      valuePropName: 'checked'
    }
  ]

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '25%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      ...useColumnSearch().getColumnSearchProps('licensePlate'),
      sorter: (a, b) => handlingTsUndefined(a.licensePlate).localeCompare(handlingTsUndefined(b.licensePlate)),
      align: 'center',
      width: '25%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      sorter: (a, b) => handlingTsUndefined(a.numberSeat) - handlingTsUndefined(b.numberSeat),
      align: 'center',
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => Number(a.status) - Number(b.status),
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
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
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
            <ModalForm
              isVisible={isModalOpen}
              onSubmit={handleFormSubmit}
              initialValues={selectedItem}
              fields={fields}
              setIsModalOpen={setIsModalOpen}
            />
          </>
        )
      })}
    </>
  )
}

export default VehiclesPage
