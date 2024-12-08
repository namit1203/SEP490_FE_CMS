import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useDeleteVehiclesMutation, useQueryVehicles } from '@/queries/vehicle'
import { DataTypeVehicle } from '@/types/DataType'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
// import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const VehiclesPage: React.FC = () => {
  const { data, refetch: refetchVehicles, isLoading } = useQueryVehicles()

  const deleteMutaion = useDeleteVehiclesMutation()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  useEffect(() => {
    refetchVehicles()
  }, [refetchVehicles])

  // useEffect(() => {
  //   if (formData) {
  //     form.setFieldsValue(formData)
  //     setSelectedItem(null)
  //   }
  // }, [formData, form])

  // const handleFormSubmit = async (values: any) => {
  //   const handleResponse = (response: any, successMessage: string, errorMessage: string) => {
  //     if (response.status === HttpStatusCode.Ok) {
  //       message.success(successMessage)
  //       refetchVehicles()
  //     } else {
  //       message.error(errorMessage)
  //     }
  //   }

  //   try {
  //     let response
  //     if (mode === 'add') {
  //       console.log(values)
  //       response = await addMutation.mutateAsync(values)
  //       handleResponse(response, response.message, 'Add failed')
  //     } else if (mode === 'edit' && lastFetchedId != null) {
  //       response = await updateMutation.mutateAsync({ id: lastFetchedId, body: values })
  //       handleResponse(response, 'Update successfully', 'Update failed')
  //     }
  //   } catch (error) {
  //     console.error('Error values:', error)
  //   } finally {
  //     setIsModalOpen(false)
  //     setSelectedItem(null)
  //   }
  // }

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetchVehicles()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  // const openAddModal = () => {
  //   setMode('add')
  //   form.resetFields()
  //   setIsModalOpen(true)
  // }

  // const fields: ModalFormProps<DataTypeVehicle>['fields'] = [
  //   {
  //     name: 'description',
  //     label: 'Mô tả',
  //     component: <TextArea />,
  //     rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
  //   },
  //   {
  //     name: 'driverId',
  //     label: 'Tài xế',
  //     component: (
  //       <Select placeholder='Chọn tài xế' style={{ width: '100%' }}>
  //         {dataTypeDriver?.map((item: any) => (
  //           <Option key={item.id} value={item.id}>
  //             {item.userName}
  //           </Option>
  //         ))}
  //       </Select>
  //     ),
  //     rules: [{ required: true, message: 'Vui lòng chọn tài xế!' }]
  //   },
  //   {
  //     name: 'image',
  //     label: 'Link ảnh',
  //     component: <Input />,
  //     rules: [{ required: true, message: 'Vui lòng nhập link ảnh!' }]
  //   },
  //   {
  //     name: 'numberSeat',
  //     label: 'Số ghế ngồi',
  //     component: <InputNumber style={{ width: '100%' }} />,
  //     rules: [{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]
  //   },
  //   {
  //     name: 'licensePlate',
  //     label: 'Biển số xe',
  //     component: <Input />,
  //     rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
  //   },
  //   {
  //     name: 'vehicleTypeId',
  //     label: 'Nhà xe',
  //     component: (
  //       <Select placeholder='Chọn nhà xe' style={{ width: '100%' }}>
  //         {dataTypeOfVehicles?.map((item: any) => (
  //           <Option key={item.id} value={item.id}>
  //             {item.description}
  //           </Option>
  //         ))}
  //       </Select>
  //     ),
  //     rules: [{ required: true, message: 'Vui lòng chọn nhà xe!' }]
  //   },
  //   {
  //     name: 'vehicleOwner',
  //     label: 'Chủ nhà xe',
  //     component: (
  //       <Select placeholder='Chọn nhà xe' style={{ width: '100%' }}>
  //         {dataTypeOfVehiclesOwner?.map((item: any) => (
  //           <Option key={item.id} value={item.id}>
  //             {item.username}
  //           </Option>
  //         ))}
  //       </Select>
  //     ),
  //     rules: [{ required: true, message: 'Vui lòng chọn chủ nhà xe!' }]
  //   },
  //   {
  //     name: 'status',
  //     label: 'Trạng thái',
  //     component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
  //     valuePropName: 'checked'
  //   }
  // ]

  const columns: TableProps<DataTypeVehicle>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '25%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      ...useColumnSearch().getColumnSearchProps('licensePlate'),
      sorter: (a, b) => handlingTsUndefined(a.licensePlate).localeCompare(handlingTsUndefined(b.licensePlate)),
      align: 'center',
      width: '25%'
    },
    {
      title: 'Số ghế',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      sorter: (a, b) => handlingTsUndefined(a.numberSeat) - handlingTsUndefined(b.numberSeat),
      align: 'center',
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => Number(a.status) - Number(b.status),
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`edit?id=${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => {
              handleFormDelete(record.id)
            }}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to='add'>
                <Button type='primary' icon={<PlusOutlined />} ghost>
                  Thêm mới
                </Button>
              </Link>
            </div>
            <Table columns={columns} dataSource={dataSource} />
            {/* <ModalForm
              form={form}
              isVisible={isModalOpen}
              onSubmit={handleFormSubmit}
              initialValues={selectedItem}
              fields={fields}
              setIsModalOpen={setIsModalOpen}
              setSelectedItem={setSelectedItem}
            /> */}
          </>
        )
      })}
    </>
  )
}

export default VehiclesPage
