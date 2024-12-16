import { useQueryUserProfile } from '@/queries/user-profile'
import renderWithLoading from '@/utils/renderWithLoading'
import { Col, Form, Row, Table, Image, Button } from 'antd'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfilePage: React.FC = () => {
  const { data, isLoading, refetch } = useQueryUserProfile()
  const navigate = useNavigate()

  useEffect(() => {
    refetch()
  }, [refetch])

  const userData = useMemo(() => {
    return [
      { key: 'avatar', label: 'Avatar', value: data?.avatar || 'N/A' },
      { key: 'username', label: 'User Name', value: data?.username || 'N/A' },
      { key: 'fullName', label: 'Full Name', value: data?.fullName || 'N/A' },
      { key: 'email', label: 'Email ', value: data?.email || 'N/A' },
      { key: 'address', label: 'Address ', value: data?.address || 'N/A' },
      { key: 'numberPhone', label: 'Number Phone ', value: data?.numberPhone || 'N/A' },
      { key: 'liscense', label: 'Liscense ', value: data?.liscense || 'N/A' },
      { key: 'activeCode', label: 'Active Code ', value: data?.activeCode || 'N/A' },
      { key: 'dob', label: 'Date Of Birth ', value: data?.dob || 'N/A' },
      { key: 'status', label: 'Status', value: data?.status === true ? 'Active' : 'Inactive' }
    ]
  }, [data])

  const columns = useMemo(
    () => [
      {
        title: 'Key',
        dataIndex: 'label',
        key: 'label',
        width: '30%'
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '70%',
        render: (value: any, record: any) => {
          if (record.key === 'avatar') {
            return value !== null ? (
              <Image src={value} alt='Avatar' style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            ) : (
              'N/A'
            )
          }
          return value
        }
      }
    ],
    []
  )

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <Form layout='vertical'>
            <Table columns={columns} dataSource={userData} pagination={false} bordered />
            <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
              <Col>
                <Button type='primary' onClick={() => navigate('/user-profile/update')} style={{ marginRight: '10px' }}>
                  Edit user
                </Button>
              </Col>
            </Row>
          </Form>
        )
      })}
    </>
  )
}
export default UserProfilePage
