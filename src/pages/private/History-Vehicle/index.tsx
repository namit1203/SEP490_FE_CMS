import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentVehicle } from '@/queries/history'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface DataType {
  key: string
  vehiclePrice: number
  driverName: string
  timeStart: number
  timeEnd: number
  price: number
  carOwner: string
  createdAt: string // ISO string for date-time
}

const HistoryRentVehiclePage: React.FC = () => {
  const { data, isLoading } = useQueryHistoryRentVehicle()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên tài xế',
      dataIndex: 'driverName',
      key: 'driverName',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('driverName'),
      width: '20%'
    },
    {
      title: 'Giá xe',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price),
      width: '20%'
    },
    {
      title: 'Chủ xe',
      dataIndex: 'carOwner',
      key: 'carOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('carOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licenseVehicle',
      key: 'licenseVehicle',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licenseVehicle'),
      width: '20%'
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            onChange={(dates, dateStrings: any) => {
              if (dates) {
                setSelectedKeys([dateStrings])
              } else {
                setSelectedKeys([])
              }
            }}
            format='YYYY-MM-DD'
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div>
            <Button
              type='primary'
              onClick={confirm as any}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters as any} size='small' style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        if (Array.isArray(value) && value[0]) {
          const [startDate, endDate] = (value[0] as string).split(',')
          const recordDate = dayjs(record.createdAt)
          return recordDate.isAfter(dayjs(startDate)) && recordDate.isBefore(dayjs(endDate))
        }
        return false
      },
      render: (text) => <span>{formatTime(text)}</span>
    }
  ]
  const dataSource = data?.paymentRentVehicelDTOs?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
            <div>
              Total : <span style={{ fontSize: 20 }}>{formatPrize(data?.total)}</span>
            </div>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentVehiclePage
