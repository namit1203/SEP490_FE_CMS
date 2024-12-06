import React, { useState } from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { routesConfig } from '@/useRouter'
import HeaderLayout from '@/layout/Header'
import Sidebar from '@/layout/Sidebar'

const { Content, Footer } = Layout

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const location = useLocation()

  // Helper functions
  const getChildrenOfRootPath = () => {
    return routesConfig[0]?.children?.map((child) => child.path) || []
  }

  const isChildRoute = () => {
    const childrenPaths = getChildrenOfRootPath()
    return childrenPaths.some((path) => location.pathname.startsWith(path))
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
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer
            }}
          >
            {isChildRoute() ? <Outlet /> : <p>Private Layout</p>}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>VeXeRe CMS ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  )
}

export default PrivateLayout
