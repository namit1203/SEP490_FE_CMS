import { CarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Switch } from 'antd'

const LoginForm = ({ onFinish, styles, loading, isDriver, setIsDriver }: any) => {
  const handleToggle = (checked: boolean) => {
    setIsDriver(checked)
  }

  return (
    <Form
      name='normal_login'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout='vertical'
      requiredMark='optional'
    >
      {/* Toggle button */}
      <Form.Item>
        <Switch
          checked={isDriver}
          onChange={handleToggle}
          checkedChildren={<CarOutlined />}
          unCheckedChildren={<UserOutlined />}
        />
        <span style={{ marginLeft: '12px' }}>{isDriver ? 'Tài xế đăng nhập' : 'QTV đăng nhập'}</span>
      </Form.Item>

      <Form.Item
        name='username'
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder={isDriver ? 'Tài xế tài khoản' : 'Người dùng tài khoản'} />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!'
          }
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Mật khẩu' />
      </Form.Item>

      <Form.Item>
        <Form.Item valuePropName='checked' noStyle>
          <Checkbox>Nhớ đăng nhập</Checkbox>
        </Form.Item>
        <a style={styles.forgotPassword} href=''>
          Quên mật khẩu?
        </a>
      </Form.Item>

      <Form.Item style={{ marginBottom: '0px' }}>
        <Button block type='primary' htmlType='submit' loading={loading}>
          {isDriver ? 'Tài xế đăng nhập' : 'Đăng nhập'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
