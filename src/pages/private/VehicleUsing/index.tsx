import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryVehiclesUsing } from '@/queries/vehicle-using'
import { DataType } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import type { TableProps } from 'antd'
import { Table } from 'antd'
import React from 'react'

const VehicleUsingPage: React.FC = () => {
  const { data, isLoading } = useQueryVehiclesUsing()

  // Transform data source to ensure each record has a `key`
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên tài xế',
      dataIndex: 'driverName',
      key: 'driverName',
      ...useColumnSearch().getColumnSearchProps('driverName'),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      align: 'center',
      width: '15%'
    },
    {
      title: 'Kiểu xe',
      dataIndex: 'vehicleTypeName',
      key: 'vehicleTypeName',
      align: 'center',
      width: '15%'
    },
    {
      title: 'Mô tả xe',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      width: '20%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'numberSeat',
      align: 'center',
      key: 'numberSeat',
      sorter: (a, b) => handlingTsUndefined(a.numberSeat) - handlingTsUndefined(b.numberSeat),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    }
    // {
    //   title: 'Action',
    //   key: 'action',
    //   align: 'center',
    //   render: (_, record) => (
    //     <Space size='middle'>
    //       <Link to={`edit?id=${record.id}`}>
    //         <Button type='primary'>Edit</Button>
    //       </Link>
    //       <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
    //         <Button type='primary' danger>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   )
    // }
  ]

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default VehicleUsingPage
