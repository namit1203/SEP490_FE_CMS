import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentDriver } from '@/queries/history'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface DataType {
  key: string
  price: number
  driverName: string
  endStart: number
  timeStart: number
  vehicleOwner: string
  createdAt: string
}

const HistoryRentDriverPage: React.FC = () => {
  const { data, isLoading } = useQueryHistoryRentDriver()

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
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'timeStart',
      key: 'timeStart',
      align: 'center',
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date, dateString: any) => {
              if (date) {
                setSelectedKeys([dateString])
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
        if (value) {
          const recordDate = dayjs(record.timeStart)
          return recordDate.isSame(dayjs(value as string), 'day')
        }
        return false
      },
      render: (text) => <span>{formatTime(text)}</span>
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endStart',
      key: 'endStart',
      align: 'center',
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date, dateString: any) => {
              if (date) {
                setSelectedKeys([dateString])
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
        if (value) {
          const recordDate = dayjs(record.endStart)
          return recordDate.isSame(dayjs(value as string), 'day')
        }
        return false
      },
      render: (text) => <span>{formatTime(text)}</span>
    }
  ]
  const dataSource = data?.map((item: any) => ({
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
            {/* <div>
              Total : <span style={{ fontSize: 20 }}>{formatPrize(data?.total)}</span>
            </div> */}
          </>
        )
      })}
    </>
  )
}

export default HistoryRentDriverPage
