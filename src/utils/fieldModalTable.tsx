import { ModalFormProps } from '@/components/Modal/ModalForm'
import { DataType, DataTypeUser } from '@/types/DataType'
import { DatePicker, Input, InputNumber, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'

// muốn thêm fields nào vào trong modal form
export const fieldModalTable: ModalFormProps<DataType>['fields'] = [
  {
    name: 'name',
    label: 'Tên chuyến đi',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
  },
  {
    name: 'startTime',
    label: 'Thời gian khởi hành',
    component: <InputNumber style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Vui lòng nhập thời gian khởi hành!' }]
  },
  {
    name: 'price',
    label: 'Giá vé',
    component: <InputNumber style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
  },
  {
    name: 'licensePlate',
    label: 'Biển số xe',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
  },
  {
    name: 'pointStart',
    label: 'Điểm đến',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập điểm đến!' }]
  },
  {
    name: 'pointEnd',
    label: 'Điểm đi',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập điểm đi!' }]
  },
  {
    name: 'description',
    label: 'Mô tả',
    component: <TextArea />
  },
  {
    name: 'status',
    label: 'Trạng thái',
    component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
    valuePropName: 'checked'
  },
  {
    name: 'codePromotion',
    label: 'Code Promotion',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập mã khuyến mại!' }]
  },
  {
    name: 'discount',
    label: 'Giá trị',
    component: <InputNumber style={{ width: '100%' }} />,
    rules: [
      { required: true, message: 'Vui lòng nhập giá trị!' },
      {
        validator: (_: any, value: any) => {
          if (!value || parseInt(value, 10) <= 100) {
            return Promise.resolve() // Validation passed
          }
          return Promise.reject(new Error('Giá trị không được lớn hơn 100!')) // Validation failed
        }
      }
    ]
  },
  {
    name: 'exchangePoint',
    label: 'Điểm đổi',
    component: <InputNumber style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Vui lòng nhập điểm đổi!' }]
  },
  {
    name: 'startDate',
    label: 'Thời gian bắt đầu khuyến mãi',
    component: <DatePicker format='DD-MM-YYYY' />,
    rules: [{ required: true, message: 'Vui lòng nhập Thời gian bắt đầu khuyến mãi!' }]
  },
  {
    name: 'endDate',
    label: 'Thời gian kết thúc khuyến mãi',
    component: <DatePicker format='DD-MM-YYYY' />,
    rules: [{ required: true, message: 'Vui lòng nhập Thời gian kết thúc khuyến mãi!' }]
  },
  {
    name: 'timeStartDetils',
    label: 'Time Start Detail',
    component: (
      <DatePicker
        showTime={{
          format: 'HH:mm:ss' // Ensures the popup time format is clear
        }}
        format='HH:mm:ss' // Format for the input field
        picker='time' // Ensure this matches 'time' for selecting only time
        placeholder='Select Time' // Placeholder text for clarity
      />
    ),
    rules: [{ required: true, message: 'Vui lòng nhập Thời gian bắt đầu chi tiết!' }]
  },
  {
    name: 'timeEndDetails',
    label: 'Time End Detail',
    component: (
      <DatePicker
        showTime={{
          format: 'HH:mm:ss' // Ensures the popup time format is clear
        }}
        format='HH:mm:ss' // Format for the input field
        picker='time' // Ensure this matches 'time' for selecting only time
        placeholder='Select Time' // Placeholder text for clarity
      />
    ),
    rules: [{ required: true, message: 'Vui lòng nhập Thời gian kết thúc chi tiết!' }]
  },
  {
    name: 'pointStartDetails',
    label: 'Point Start Details',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập điểm bắt đầu chi tiết!' }]
  },
  {
    name: 'pointEndDetails',
    label: 'Point End Details',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập điểm kết thúc chi tiết!' }]
  },
  {
    name: 'imagePromotion',
    label: 'Ảnh mã khuyến mại',
    component: <Input />
  }
]

export const fieldUser: ModalFormProps<DataTypeUser>['fields'] = [
  {
    name: 'username',
    label: 'Username',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]
  },
  {
    name: 'email',
    label: 'Email',
    component: <Input />,
    rules: [{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]
  },
  {
    name: 'role',
    label: 'Role',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập vai trò!' }]
  },
  {
    name: 'numberPhone',
    label: 'Phone Number',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
  },
  {
    name: 'password',
    label: 'Password',
    component: <Input.Password />,
    rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
  },
  {
    name: 'liscense',
    label: 'License',
    component: <Input />,
    rules: [{ required: false }]
  },
  {
    name: 'avatar',
    label: 'Avatar',
    component: <Input />,
    rules: [{ required: false }]
  },
  {
    name: 'fullName',
    label: 'Full Name',
    component: <Input />,
    rules: [{ required: true, message: 'Vui lòng nhập họ và tên!' }]
  },
  {
    name: 'address',
    label: 'Address',
    component: <TextArea />,
    rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }]
  },
  {
    name: 'activeCode',
    label: 'Active Code',
    component: <Input />,
    rules: [{ required: false }]
  },
  {
    name: 'status',
    label: 'Status',
    component: <Switch checkedChildren='Active' unCheckedChildren='Inactive' />,
    valuePropName: 'checked'
  },
  {
    name: 'dob',
    label: 'Date of Birth',
    component: <DatePicker format='DD-MM-YYYY' placeholder='Select Date' />,
    rules: [{ required: false }]
  }
]
