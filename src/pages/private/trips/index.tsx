import ModalForm from '@/components/Modal/ModalForm'
import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTrips } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Form, Popconfirm, Space, Table, TableProps } from 'antd'

import React, { useState } from 'react'

const TripPage: React.FC = () => {
  const [form] = Form.useForm()
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
    form.setFieldsValue(item)
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

  const filteredFields = fieldModalTable.filter(
    (field) =>
      field.name && ['name', 'licensePlate', 'startTime', 'pointStart', 'pointStart', 'price'].includes(field.name)
  )

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
              form={form}
              isVisible={isModalOpen}
              onSubmit={handleFormSubmit}
              initialValues={selectedItem}
              fields={filteredFields}
              setIsModalOpen={setIsModalOpen}
              setSelectedItem={setSelectedItem}
            />
          </>
        )
      })}
    </>
  )
}

export default TripPage
