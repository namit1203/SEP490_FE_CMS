import logo from '@/assets/logo.png'
import { RoleType } from '@/enums/enum'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { allowAdminRoute, allowDriverRoute, allowStaffRoute, allowVehicleOwnerRoute } from '@/utils/rolePath'
import {
  AccountBookOutlined,
  CarOutlined,
  DashboardOutlined,
  EuroCircleFilled,
  GiftOutlined,
  HistoryOutlined,
  ReconciliationFilled,
  ShopFilled,
  ShoppingFilled,
  StarFilled,
  SwitcherFilled,
  TruckFilled,
  TruckOutlined,
  UnlockFilled,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
}

const { Sider } = Layout

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const [filteredItems, setFilteredItems] = useState<MenuProps['items']>([])

  const role = useLocalStorage.getLocalStorageData('role')
  useEffect(() => {
    // Define menu items
    const items: MenuProps['items'] = [
      {
        label: 'MAIN',
        key: 'main',
        type: 'group', // Non-clickable heading
        children: [
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link to='/'>Dashboard</Link> // Link added
          },
          {
            key: 'trips',
            icon: <TruckOutlined />,
            label: <Link to='/trips'>Trips</Link> // Link added
          },
          {
            key: 'vehicles',
            icon: <CarOutlined />,
            label: <Link to='/vehicles'>Vehicles</Link> // Link added
          },
          {
            key: 'vehicles-owner',
            icon: <TruckOutlined />,
            label: <Link to='/vehicles-owner'>Vehicles Owner</Link> // Link added
          },
          {
            key: 'vehicles-using',
            icon: <CarOutlined />,
            label: <Link to='/vehicles-using'>Vehicles Using</Link> // Link added
          },
          {
            key: 'promotion',
            icon: <GiftOutlined />,
            label: <Link to='/promotion'>Promotions</Link> // Link added
          },
          {
            key: 'driver',
            icon: <UserOutlined />,
            label: <Link to='/driver'>Drivers</Link> // Link added
          },
          {
            key: 'history-rent-driver',
            icon: <CarOutlined />,
            label: <Link to='/history-rent-driver'>History Rent Driver</Link> // Link added
          },
          {
            key: 'history-rent-vehicle',
            icon: <HistoryOutlined />,
            label: <Link to='/history-rent-vehicle'>History Rent Vehicle</Link> // Link added
          },
          {
            key: 'cost-type',
            icon: <EuroCircleFilled />,
            label: <Link to='/cost-type'>Cost Type</Link> // Link added
          },
          {
            key: 'fixed-cost',
            icon: <TruckFilled />,
            label: <Link to='/fixed-cost'>Fixed Cost</Link> // Link added
          },
          {
            key: 'request',
            icon: <ShoppingFilled />,
            label: <Link to='/request'>Request</Link> // Link added
          },
          {
            key: 'ticket',
            icon: <SwitcherFilled />,
            label: <Link to='/ticket'>Ticket</Link> // Link added
          },
          {
            key: 'total-ticket',
            icon: <ReconciliationFilled />,
            label: <Link to='/total-ticket'>Total Ticket</Link> // Link added
          },
          {
            key: 'ticket-not-paid',
            icon: <ShopFilled />,
            label: <Link to='/ticket-not-paid'>Ticket Not Paid</Link> // Link added
          },
          {
            key: 'reviews',
            icon: <StarFilled />,
            label: <Link to='/reviews'>Reviews</Link> // Link added
          },
          {
            key: 'account',
            icon: <UserSwitchOutlined />,
            label: <Link to='/account'>Account</Link> // Link added
          },
          {
            key: 'revenue',
            icon: <AccountBookOutlined />,
            label: <Link to='/revenue'>Revenue</Link> // Link added
          },
          {
            key: 'role',
            icon: <UnlockFilled />,
            label: <Link to='/role'>Role</Link> // Link added
          }
        ]
      }
    ]

    const filteredItems = items
      .map((group: any) => ({
        ...group,
        children: group.children?.filter((item: any) => {
          switch (role) {
            case RoleType.ADMIN:
              return allowAdminRoute.includes(item.key)

            case RoleType.STAFF:
              return allowStaffRoute.includes(item.key)

            case RoleType.DRIVER:
              return allowDriverRoute.includes(item.key)

            case RoleType.VEHICLE_OWNER:
              return allowVehicleOwnerRoute.includes(item.key)

            default:
              return false
          }
        })
      }))
      .filter((group) => group.children?.length > 0)

    setFilteredItems(filteredItems)
  }, [role])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <div
        style={{
          height: '142.84px',
          backgroundColor: '#1E65B0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px'
        }}
      >
        <img src={logo} alt='logo' />
      </div>
      <Menu
        mode='inline'
        items={filteredItems}
        defaultSelectedKeys={['dashboard']}
        style={{
          height: '100%',
          borderRight: 0
        }}
        theme='light'
      />
    </Sider>
  )
}

export default Sidebar
