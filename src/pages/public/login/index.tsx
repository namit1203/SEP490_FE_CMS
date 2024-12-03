import { Card, Grid, message, theme } from 'antd'
import { useState } from 'react'
import Footer from '../../../components/auth/Footer'
import Header from '../../../components/auth/Header'
import LoginForm from '../../../components/auth/LoginForm'
import getStyles from '../../../components/auth/styles'
import { HttpStatusCode } from '../../../constants/httpStatusCode.enum'
import { useLoginMutation } from '../../../queries/auth'

const { useToken } = theme
const { useBreakpoint } = Grid

export default function LoginPage() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const styles = getStyles(token, screens)
  const [loading, setLoading] = useState(false)
  const loginMutation = useLoginMutation()

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
    try {
      const response = await loginMutation.mutateAsync(updatedData)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Đăng nhập thành công')
      } else {
        message.error('Đăng nhập thất bại')
      }
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Header styles={styles} />
          <LoginForm onFinish={onFinish} styles={styles} loading={loading} />
          <Footer styles={styles} />
        </Card>
      </div>
    </section>
  )
}
