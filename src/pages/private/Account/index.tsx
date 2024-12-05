import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, InputRef, Popconfirm, Space, Table, TableColumnType, TableProps } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useQueryAccount } from '../../../queries/account'

interface DataType {
  key: string
  avatar: string
  email: string
  fullName: string
  numberPhone: string
  username: string
  status: boolean
}

type DataIndex = keyof DataType

const AccountPage: React.FC = () => {
  const { data } = useQueryAccount()
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
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => (
        <Avatar src={'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
      ),
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
      width: '20%'
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%',
      ...getColumnSearchProps('fullName')
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone',
      width: '20%'
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      ...getColumnSearchProps('username')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <p>{status === true ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <Button type='primary'>Edit</Button>
          <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default AccountPage
