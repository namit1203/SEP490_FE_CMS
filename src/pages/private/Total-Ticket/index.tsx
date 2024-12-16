import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTicketTotal } from '@/queries/ticket'
import renderWithLoading from '@/utils/renderWithLoading'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface DataType {
  key: string
  id: number
  liscenseVehicle: string
  pricePromotion: number
  typeOfPayment: string
  typeOfTicket: string
  vehicleId: number
  vehicleOwner: string
  createdAt: string // ISO string for date-time
}

const TotalTicketPage: React.FC = () => {
  const { data, isLoading } = useQueryTicketTotal()

  const emptyValue = (value: any) => {
    return <span>{value === null || value === undefined ? '(Không)' : value}</span>
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Chủ xe',
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'liscenseVehicle',
      key: 'liscenseVehicle',
      ...useColumnSearch().getColumnSearchProps('liscenseVehicle'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Giá tiền',
      dataIndex: 'pricePromotion',
      key: 'pricePromotion',
      ...useColumnSearch().getColumnSearchProps('pricePromotion'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'typeOfPayment',
      key: 'typeOfPayment',
      ...useColumnSearch().getColumnSearchProps('typeOfPayment'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Loại vé',
      dataIndex: 'typeOfTicket',
      key: 'typeOfTicket',
      ...useColumnSearch().getColumnSearchProps('typeOfTicket'),
      render: (text) => emptyValue(text),
      align: 'center',
      width: '15%'
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: '15%',
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

  const dataSource =
    data?.listTicket?.map((item: any) => ({
      ...item,
      key: item?.id || item?.someUniqueField || ''
    })) || []

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
            <div>
              Total : <span style={{ fontSize: 20 }}>{data?.total ? formatPrize(data.total) : '(Không)'}</span>
            </div>
          </>
        )
      })}
    </>
  )
}

export default TotalTicketPage
