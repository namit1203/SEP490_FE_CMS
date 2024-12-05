import { Button, Card, Space, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
          403 - Forbidden
        </Title>
        <Text type='secondary'>Bạn không có quyền truy cập vào tài nguyên này.</Text>
        <Space direction='vertical' size='middle' style={{ marginTop: 20, width: '100%' }}>
          <Button type='default' block onClick={() => navigate('/')}>
            Về Trang chủ
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default UnauthorizedPage
