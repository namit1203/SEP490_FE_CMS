import {
  AppstoreOutlined,
  BarChartOutlined,
  CarOutlined,
  DashboardOutlined,
  EuroCircleFilled,
  FileTextOutlined,
  GiftOutlined,
  SettingOutlined,
  ShoppingFilled,
  ToolOutlined,
  TruckFilled,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Badge, Layout, Menu } from 'antd'
import React from 'react'

import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

interface SidebarProps {
  collapsed: boolean
}

const { Sider } = Layout

// Define menu items
const items: MenuProps['items'] = [
  {
    label: 'MAIN',
    key: 'main',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'trips',
        icon: <DashboardOutlined />,
        label: <Link to='/trips'>Trips</Link> // Link added
      },
      {
        key: 'vehicles',
        icon: <CarOutlined />,
        label: <Link to='/vehicles'>Vehicles</Link> // Link added
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
        key: 'cost_type',
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
      }
    ]
  },
  {
    label: 'WIDGETS',
    key: 'widgets',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'widgets-item',
        icon: <AppstoreOutlined />,
        label: <Link to='/widgets'>Widgets</Link> // Link added
      }
    ]
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' }
        ]
      }
    ]
  },
  {
    label: 'GENERAL',
    key: 'general',
    type: 'group', // Non-clickable heading
    children: [
      {
        key: 'ui-elements',
        icon: <ToolOutlined />,
        label: 'UI Elements'
      },
      {
        key: 'utilities',
        icon: <SettingOutlined />,
        label: 'Utilities'
      },
      {
        key: 'charts',
        icon: <BarChartOutlined />,
        label: 'Charts'
      },
      {
        key: 'forms',
        icon: <FileTextOutlined />,
        label: (
          <span>
            Forms <Badge count={6} style={{ marginLeft: '10px' }} />
          </span>
        )
      },
      {
        key: 'advanced-ui',
        icon: <ToolOutlined />,
        label: 'Advanced UI'
      }
    ]
  },
  {
    label: 'WEB APPS',
    key: 'web-apps',
    type: 'group', // Non-clickable heading
    children: []
  }
]

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <div
        style={{
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
        items={items}
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
