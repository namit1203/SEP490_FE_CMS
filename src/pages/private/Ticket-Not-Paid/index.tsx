import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTicket, useQueryTicketNotPaid } from '@/queries/ticket'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  ticketId: number
  fullName: string
  typeOfPayment: string
  price: number
}

const TicketNotPaidPage: React.FC = () => {
  const { data, isLoading } = useQueryTicketNotPaid({ id: 1 })
  const { data: dataTicket } = useQueryTicket()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'ticketId',
      align: 'center',
      key: 'ticketId',
      ...useColumnSearch().getColumnSearchProps('ticketId'),
      render: (_, record) => <span>{record.ticketId}</span>,
      width: '20%'
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'fullName',
      align: 'center',
      key: 'fullName',
      ...useColumnSearch().getColumnSearchProps('fullName'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'typeOfPayment',
      align: 'center',
      key: 'typeOfPayment',
      width: '20%'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      render: (text) => <span>{formatPrize(text)}</span>,
      width: '15%'
    },
    {
      title: 'Action',
      align: 'center',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <Popconfirm title='Are you sure to Approve this item?' okText='Yes' cancelText='No'>
            <Button type='primary'>Approve</Button>
          </Popconfirm>
        </Space>
      ),
      width: '20%'
    }
  ]

  const dataSource = data?.tickets?.map((item: any) => {
    const ticketDetails = dataTicket?.find((ticket: any) => ticket.id === item.ticketId)
    return {
      ...item,
      key: item.ticketId || item.someUniqueField,
      ticketId: ticketDetails?.description
    }
  })

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

export default TicketNotPaidPage
