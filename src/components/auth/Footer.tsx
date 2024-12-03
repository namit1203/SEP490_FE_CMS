import { Typography } from 'antd'

const { Text, Link } = Typography

const Footer = ({ styles }: any) => (
  <div style={styles.footer}>
    <Text style={styles.text}>Bạn đã có tài khoản?</Text> <Link href=''>Đăng nhập ngay</Link>
  </div>
)

export default Footer
