import ModalForm, { ModalFormProps } from '@/components/Modal/ModalForm'
import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTrips } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Input, InputNumber, Popconfirm, Space, Switch, Table, TableProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

const TripPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null)

  const { data, isLoading } = useQueryTrips()

  // Transform data source to ensure each record has a `key`
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleEdit = (item: DataType) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`)
    // Implement delete logic
  }

  const handleFormSubmit = (values: DataType) => {
    console.log('Updated values:', values)
    setIsModalOpen(false)
    setSelectedItem(null)
    // Implement update logic
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
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('name'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      width: '25%'
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
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
          <Popconfirm
            title='Are you sure to delete this item?'
            onConfirm={() => handleDelete(record.key)}
            okText='Yes'
            cancelText='No'
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

export default TripPage
