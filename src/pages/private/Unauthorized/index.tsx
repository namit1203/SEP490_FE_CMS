import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Space, Card } from 'antd'

const { Title, Text } = Typography

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card style={{ maxWidth: 400, textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} bordered={false}>
        <Title level={2} style={{ color: '#ff4d4f' }}>
          401 - Unauthorized
        </Title>
        <Text type='secondary'>Bạn không có quyền truy cập vào trang này.</Text>
        <Space direction='vertical' size='middle' style={{ marginTop: 20, width: '100%' }}>
          <Button type='primary' block onClick={() => navigate('/login')}>
            Quay lại Đăng nhập
          </Button>
          <Button type='default' block onClick={() => navigate('/')}>
            Về Trang chủ
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default UnauthorizedPage
