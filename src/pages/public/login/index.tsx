import { Card, Grid, message, theme } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/auth/Footer'
import Header from '../../../components/auth/Header'
import LoginForm from '../../../components/auth/LoginForm'
import getStyles from '../../../components/auth/styles'
import { HttpStatusCode } from '../../../constants/httpStatusCode.enum'
import { useLoginDriverMutation, useLoginMutation } from '../../../queries/auth'

const { useToken } = theme
const { useBreakpoint } = Grid

export default function LoginPage() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const styles = getStyles(token, screens)
  const [loading, setLoading] = useState(false)
  const [isDriver, setIsDriver] = useState(false)

  const loginMutation = useLoginMutation()
  const loginDriverMutation = useLoginDriverMutation()

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    setLoading(true)

    const updatedData = {
      id: 0,
      email: 'string',
      roleName: 'string',
      numberPhone: 'string',
      username: values.username,
      password: values.password
    }

    const dataDriver = {
      email: 'string',
      username: values.username,
      password: values.password
    }

    try {
      const response = isDriver
        ? await loginDriverMutation.mutateAsync(dataDriver)
        : await loginMutation.mutateAsync(updatedData)

      if (response.status === HttpStatusCode.Ok) {
        message.success('Đăng nhập thành công')
        navigate('/')
      } else {
        message.error('Đăng nhập thất bại')
      }
    } catch (error: any) {
      message.error(error.message || 'Đã xảy ra lỗi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Header styles={styles} />
          <LoginForm
            onFinish={onFinish}
            styles={styles}
            loading={loading}
            isDriver={isDriver}
            setIsDriver={setIsDriver}
          />
          <Footer styles={styles} />
        </Card>
      </div>
    </section>
  )
}
