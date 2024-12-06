import { ModalFormProps } from '@/components/Modal/ModalForm'
import { DataType } from '@/types/DataType'
import { Input, InputNumber, Switch } from 'antd'
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
    component: <TextArea />,
    rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
  },
  {
    name: 'status',
    label: 'Trạng thái',
    component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
    valuePropName: 'checked'
  }
]
