import React, { useState } from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import Sidebar from '../../layout/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { routesConfig } from '../../useRouter'
import HeaderLayout from '../../layout/Header'

const { Content, Footer } = Layout

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const location = useLocation()
  const childrenOfRootPath = routesConfig[0]?.children?.map((child) => child.path) || []
  const isChildRoute = childrenOfRootPath.some((path) => location.pathname.startsWith(path))

  const breadcrumbItems = [{ title: 'User' }, { title: 'Bill' }]

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
            {isChildRoute ? <Outlet /> : <p>Private Layout</p>}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>VeXeRe CMS ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  )
}

export default PrivateLayout
