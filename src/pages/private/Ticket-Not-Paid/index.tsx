import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { RoleType } from '@/enums/enum'
import { formatPrize } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryTicket, useQueryTicketNotPaid, useUpdateStatusTicketMutation } from '@/queries/ticket'
import { useQueryUserProfile } from '@/queries/user-profile'
import { useQueryVehicles } from '@/queries/vehicle'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, message, Popconfirm, Select, Space, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'

interface DataType {
  key: string
  id: number
  ticketId: number
  fullName: string
  typeOfPayment: string
  price: number
}

const TicketNotPaidPage: React.FC = () => {
  const { data: dataVehicle } = useQueryVehicles()

  const [searchId, setSearchId] = useState<string | number | null>(null)

  const acceptMutaion = useUpdateStatusTicketMutation()

  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false)

  const { data, isLoading, refetch } = useQueryTicketNotPaid(
    { id: searchId },
    {
      enabled: searchId !== null
    }
  )
  const { data: dataTicket } = useQueryTicket()

  const { data: account } = useQueryUserProfile()

  const dataSource = data?.tickets?.map((item: any) => {
    const ticketDetails = dataTicket?.find((ticket: any) => ticket.id === item.ticketId)
    return {
      ...item,
      key: item.ticketId || item.someUniqueField,
      ticketId: ticketDetails?.description,
      id: item.ticketId
    }
  })

  useEffect(() => {
    if (dataVehicle && dataVehicle.length > 0) {
      setSearchId(dataVehicle[0].id)
    }
  }, [dataVehicle])

  useEffect(() => {
    if (searchId) {
      refetch()
    }
  }, [refetch, searchId])

  const handleChange = useDebounce((value: any) => {
    setSearchId(value)
  }, 500)

  const handleAccept = async (id: number) => {
    try {
      setIsAcceptLoading(true)
      const response = await acceptMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Accept successfully')
        refetch()
      } else {
        message.error('Accept failed')
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error('Accept failed')
    } finally {
      setIsAcceptLoading(false)
    }
  }

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
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            title='Are you sure to Approve this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleAccept(record.id as number)}
          >
            <Button
              type='primary'
              disabled={account.role !== RoleType.DRIVER || isAcceptLoading}
              loading={isAcceptLoading}
            >
              Approve
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: '20%'
    }
  ]

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, alignItems: 'center', gap: 20 }}
            >
              <p>Bộ lọc danh sách xe:</p>
              <Select
                placeholder='Chọn xe'
                value={searchId}
                style={{ width: '15%' }}
                onChange={(value) => {
                  handleChange(value)
                }}
              >
                {dataVehicle?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.licensePlate}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default TicketNotPaidPage
