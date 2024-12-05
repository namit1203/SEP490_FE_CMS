import { SearchOutlined } from '@ant-design/icons'
import type { InputRef, TableColumnType, TableProps } from 'antd'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { ActionType, ActionTypeDescriptions } from '../../../enums/enum'
import { useQueryRequest } from '../../../queries/request'

interface DataType {
  key: string
  id: string | number
  description: string
  note: string
  userName: number
  typeId: string | number
}

type DataIndex = keyof DataType

const RequestPage: React.FC = () => {
  const { data } = useQueryRequest()

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%'
    },
    {
      title: 'Tên',
      dataIndex: 'userName',
      key: 'userName',
      width: '20%',
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'note',
      key: 'note',
      width: '20%'
    },
    {
      title: 'Type',
      dataIndex: 'typeId',
      key: 'typeId',
      width: '20%',
      render: (type: ActionType) => <span>{ActionTypeDescriptions[type]}</span>,
      filters: Object.entries(ActionTypeDescriptions).map(([key, value]) => ({
        text: value,
        value: Number(key)
      })),
      onFilter: (value, record) => record.typeId === value
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary'>Show</Button>
          <Popconfirm title='Bạn có chắc chắn muốn xóa yêu cầu này không?' okText='Yes' cancelText='No'>
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
          {record.typeId === 3 && (
            <Popconfirm title='Bạn có chắc chắn muốn hủy yêu cầu này không?' okText='Xác nhận' cancelText='Hủy'>
              <Button type='default'>Cancel</Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ]
  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}
export default RequestPage
