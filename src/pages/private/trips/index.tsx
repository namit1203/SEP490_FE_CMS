import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useUpdateStatusTripMutation, useQueryTrips } from '@/queries/trip'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { DownloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Space, Table, TableProps } from 'antd'
import { HttpStatusCode } from 'axios'

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

  const updateStatusMutation = useUpdateStatusTripMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleChangeStatus = async (id: string) => {
    try {
      const response = await updateStatusMutation.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update status successfully')
        refetch()
      } else {
        message.error('Update status failed')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleExportToExcel = () => {
    if (!data) {
      message.error('No data to export!')
      return
    }

    // Prepare data for Excel
    const formattedData = data.map((item: any) => ({
      'Tên chuyến': item.name,
      'Biển số xe': item.licensePlate,
      'Điểm khởi hành': item.pointStart,
      'Thời gian khởi hành': item.startTime,
      'Điểm kết thúc': item.pointEnd,
      'Loại chuyến': item.typeOfTrip,
      'Loại xe': item.vehicleId,
      'Mô tả': item.description,
      // eslint-disable-next-line prettier/prettier
      'Giá': formatPrize(item.price),
      'Trạng thái': item.status === true ? 'Khả dụng' : 'Không khả dụng'
    }))

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData)

    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // 'Tên chuyến'
      { wch: 15 }, // 'Biển số xe'
      { wch: 20 }, // 'Điểm khởi hành'
      { wch: 20 }, // 'Thời gian khởi hành'
      { wch: 20 }, // 'Điểm kết thúc'
      { wch: 6 }, // 'Loại chuyến'
      { wch: 6 }, // 'Loại xe'
      { wch: 25 }, // 'Mô tả'
      { wch: 15 }, // 'Giá'
      { wch: 15 } // 'Trạng thái'
    ]

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Append the worksheet to the workbook with a consistent name
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trips')

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, 'trips.xlsx')
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
            title='Are you sure to change status?'
            onConfirm={() => handleChangeStatus(record.key)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Change Status
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
                <Button type='primary' icon={<ExportOutlined />} ghost>
                  Import Excel
                </Button>
              </Link>
              <Button type='primary' onClick={handleExportToExcel} icon={<DownloadOutlined />} ghost>
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
