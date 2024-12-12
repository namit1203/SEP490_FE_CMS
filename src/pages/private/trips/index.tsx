import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTrips } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'

const TripPage: React.FC = () => {
  const { data, refetch, isLoading } = useQueryTrips()

  // Transform data source to ensure each record has a `key`
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`)
    // Implement delete logic
  }

  const handleExportToExcel = () => {
    if (!data) {
      message.error('No data to export!')
      return
    }

    // Prepare data for Excel
    const formattedData = data.map((item: any) => ({
      'Số ghế của xe': item.numberSeat,
      'Loại xe': item.vehicleTypeId,
      'Biển số xe': item.licensePlate,
      'Mô tả': item.description,
      'Chủ xe': item.vehicleOwner,
      'Tài xế': item.driverId
    }))

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData)

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Append the worksheet to the workbook with a consistent name
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicles')

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, 'vehicles.xlsx')
  }

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
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 16 }}>
              <Link to='add'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Thêm mới
                </Button>
              </Link>
              <Link to='excel'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Import Excel
                </Button>
              </Link>
              <Button type='primary' onClick={handleExportToExcel} icon={<PlusOutlined />} ghost>
                Export Excel
              </Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default TripPage
