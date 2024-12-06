import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const HeaderLayout: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const navigate = useNavigate()

  const handleLogout = () => {
    useLocalStorage.removeLocalStorageData('role')
    useLocalStorage.removeLocalStorageData('token')
    navigate('/login')
  }

  return (
    <Header className={styles['header-test']} style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64
        }}
      />
      <Link className={styles.avatar} to='user-profile'>
        <Avatar size={39} icon={<UserOutlined />} />
      </Link>
      <Button onClick={() => handleLogout()} style={{ marginRight: '20px' }}>
        Log Out
      </Button>
    </Header>
  )
}

export default HeaderLayout
