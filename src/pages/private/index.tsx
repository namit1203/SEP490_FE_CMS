import HeaderLayout from '@/layout/Header'
import Sidebar from '@/layout/Sidebar'
import { routesConfig } from '@/useRouter'
import { Breadcrumb, Layout, theme } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DashBoardChartPage from './Dashboard'
import { LeftOutlined } from '@ant-design/icons'

const { Content } = Layout

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const location = useLocation()

  const navigate = useNavigate()

  // Split the pathname into segments
  const pathSegments = location.pathname.split('/').filter(Boolean)

  // Check if it's a nested route
  const isNestedRoute = pathSegments.length > 1

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }

  // Helper functions
  const getChildrenOfRootPath = () => {
    return routesConfig[0]?.children?.map((child) => child.path) || []
  }

  const isChildRoute = () => {
    const childrenPaths = getChildrenOfRootPath()
    return childrenPaths.some((path) => location.pathname.startsWith(path as string))
  }

  const getBreadcrumbItems = () => {
    const baseBreadcrumb = [{ title: 'Dashboard' }]
    const pathSegments = location.pathname.split('/').filter((segment) => segment)

    const dynamicBreadcrumbs = pathSegments.map((segment) => ({
      title: segment
        .split('-') // Tách bằng dấu gạch ngang
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
        .join(' ') // Gộp lại thành chuỗi với khoảng trắng
    }))

    return [...baseBreadcrumb, ...dynamicBreadcrumbs]
  }

  // Rendered items
  const breadcrumbItems = getBreadcrumbItems()

  return (
    <Layout style={{ display: 'flex' }}>
      <Sidebar collapsed={collapsed}></Sidebar>
      <Layout>
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Breadcrumb style={{ margin: '16px 0', order: '2' }} items={breadcrumbItems} />
            {isNestedRoute && (
              <div onClick={handleBack} style={{ cursor: 'pointer' }}>
                <LeftOutlined />
              </div>
            )}
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer
            }}
          >
            {isChildRoute() ? <Outlet /> : <DashBoardChartPage />}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default PrivateLayout
