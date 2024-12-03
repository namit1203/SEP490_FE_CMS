import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'

const LoginForm = ({ onFinish, styles, loading }: any) => (
  <Form
    name='normal_login'
    initialValues={{ remember: true }}
    onFinish={onFinish}
    layout='vertical'
    requiredMark='optional'
  >
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
      <Input prefix={<UserOutlined />} placeholder='Tài khoản' />
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
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
)

export default LoginForm
