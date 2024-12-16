import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteVehiclesMutation, useQueryVehicles } from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import { getUserRoles, hasRole } from '@/utils/hasRole'
import renderWithLoading from '@/utils/renderWithLoading'
import { DownloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'

const VehiclesPage: React.FC = () => {
  const userRoles = getUserRoles()

  const { data, refetch: refetchVehicles, isLoading } = useQueryVehicles()

  const deleteMutaion = useDeleteVehiclesMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetchVehicles()
  }, [refetchVehicles])

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Change status success')
        refetchVehicles()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
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

  const columns: TableProps<DataTypeVehicle>['columns'] = [
    {
      title: 'Mô tả',
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
      title: 'Số ghế của xe',
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
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            title='Are you sure to change status?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
          >
            <Button type='primary' danger>
              Change
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
              {hasRole(userRoles, ['Staff', 'VehicleOwner']) && (
                <Link to='add'>
                  <Button type='primary' icon={<PlusOutlined />} ghost>
                    Thêm mới
                  </Button>
                </Link>
              )}
              {hasRole(userRoles, 'Staff') && (
                <Link to='excel'>
                  <Button type='primary' icon={<ExportOutlined />} ghost>
                    Import Excel
                  </Button>
                </Link>
              )}
              {hasRole(userRoles, 'Staff') && (
                <Button type='primary' onClick={handleExportToExcel} icon={<DownloadOutlined />} ghost>
                  Export Excel
                </Button>
              )}
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default VehiclesPage
